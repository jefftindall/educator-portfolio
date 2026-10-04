#!/usr/bin/env node
/**
 * Bootstrap helper (Jeff, local, once): register the GitHub App that CI/CD Terraform
 * uses for the GitHub provider, via GitHub's app-manifest flow, then install it on
 * the repo. Terraform and the REST API cannot create GitHub Apps, so this needs two
 * browser clicks: "Create GitHub App" and "Install".
 *
 * The private key goes straight from GitHub's response into Key Vault through a
 * 0600 temp file that is deleted immediately. It is never printed or written to
 * Terraform state. Prints only the App ID, slug, and installation ID (not secrets).
 *
 *   az account set --subscription <host subscription>
 *   node scripts/create-github-app.mjs
 *
 * Then set github_app_id / github_app_installation_id in infra/bootstrap/terraform.tfvars
 * and re-apply bootstrap so it publishes TF_GITHUB_APP_ID / TF_GITHUB_APP_INSTALLATION_ID.
 */
import { spawnSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { getRepoInstallationId, githubApi } from "./lib/github-app.mjs";

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...v] = a.replace(/^--/, "").split("=");
    return [k, v.join("=")];
  }),
);

const owner = args.owner || "jefftindall";
const repo = args.repo || "educator-portfolio";
const vault = args.vault || "kv-tifftindall-shared";
const appName = args.name || "tifftindall-portfolio-terraform";
const secretName = "TERRAFORM-GITHUB-APP-KEY";
const port = Number(args.port || 8765);
const redirectUrl = `http://127.0.0.1:${port}/callback`;
const state = randomBytes(16).toString("hex");

const manifest = {
  name: appName,
  url: `https://github.com/${owner}/${repo}`,
  redirect_url: redirectUrl,
  public: false,
  // Terraform GitHub provider in env stacks: environments + environment variables only.
  default_permissions: {
    administration: "write",
    environments: "write",
    metadata: "read",
  },
  default_events: [],
};

function openBrowser(url) {
  const cmd =
    process.platform === "win32" ? ["cmd", ["/c", "start", "", url]] :
    process.platform === "darwin" ? ["open", [url]] :
    ["xdg-open", [url]];
  spawnSync(cmd[0], cmd[1], { stdio: "ignore" });
}

function storePrivateKey(pem) {
  const dir = mkdtempSync(join(tmpdir(), "gh-app-"));
  const file = join(dir, "key.pem");
  try {
    writeFileSync(file, pem, { mode: 0o600 });
    const res = spawnSync(
      "az",
      ["keyvault", "secret", "set", "--vault-name", vault, "--name", secretName, "--file", file, "--only-show-errors", "-o", "none"],
      { stdio: ["ignore", "ignore", "pipe"], shell: process.platform === "win32" },
    );
    if (res.status !== 0) {
      throw new Error(`az keyvault secret set failed for ${vault}/${secretName} (exit ${res.status}).`);
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const escapeHtml = (s) => s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");

const done = new Promise((resolve, reject) => {
  const server = createServer(async (req, res) => {
    const url = new URL(req.url, `http://127.0.0.1:${port}`);
    if (url.pathname === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`<!doctype html><body onload="document.forms[0].submit()">
<form method="post" action="https://github.com/settings/apps/new?state=${state}">
<input type="hidden" name="manifest" value="${escapeHtml(JSON.stringify(manifest))}">
<noscript><button>Continue to GitHub</button></noscript></form></body>`);
      return;
    }
    if (url.pathname !== "/callback") {
      res.writeHead(404).end();
      return;
    }
    if (url.searchParams.get("state") !== state || !url.searchParams.get("code")) {
      res.writeHead(400).end("State mismatch or missing code.");
      return;
    }
    try {
      const conv = await githubApi(`/app-manifests/${url.searchParams.get("code")}/conversions`, { method: "POST" });
      if (!conv.ok) throw new Error(`Manifest conversion failed (HTTP ${conv.status}).`);
      const { id, slug, pem } = conv.data;
      storePrivateKey(pem);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<p>GitHub App created. Install it on the repo in the next tab, then close this one.</p>");
      server.close();
      resolve({ id: String(id), slug, pem });
    } catch (err) {
      res.writeHead(500).end("Failed; see terminal.");
      server.close();
      reject(err);
    }
  });
  server.listen(port, "127.0.0.1", () => {
    console.log(`Opening browser to create GitHub App "${appName}" (approve on github.com)...`);
    openBrowser(`http://127.0.0.1:${port}/`);
  });
});

try {
  const { id, slug, pem } = await done;
  console.log(`Created GitHub App id=${id} slug=${slug}; private key stored in ${vault}/${secretName}.`);
  console.log(`Install it on ONLY ${owner}/${repo} in the browser tab that just opened...`);
  openBrowser(`https://github.com/apps/${slug}/installations/new`);

  let installationId = null;
  for (let i = 0; i < 120 && !installationId; i++) {
    await new Promise((r) => setTimeout(r, 5000));
    installationId = await getRepoInstallationId(id, pem, owner, repo);
  }
  if (!installationId) {
    console.error(`Timed out waiting for the installation on ${owner}/${repo}. Install it, then re-run lookup manually.`);
    process.exit(1);
  }
  console.log(`Installation id=${installationId}.`);
  console.log("\nAdd to infra/bootstrap/terraform.tfvars and re-apply bootstrap:");
  console.log(`  github_app_id              = "${id}"`);
  console.log(`  github_app_installation_id = "${installationId}"`);
} catch (err) {
  console.error(err instanceof Error ? err.message : "GitHub App creation failed.");
  process.exit(1);
}
