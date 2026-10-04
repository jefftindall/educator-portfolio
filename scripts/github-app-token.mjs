#!/usr/bin/env node
/**
 * CI only: mint a short-lived GitHub App installation token for Terraform's GitHub
 * provider. Reads the App private key from a file (downloaded from Key Vault via
 * Azure OIDC), deletes the file, masks the token, and exports it via $GITHUB_ENV.
 *
 * Env: GITHUB_APP_ID, GITHUB_APP_INSTALLATION_ID, GITHUB_APP_PEM_PATH,
 *      GITHUB_APP_REPOSITORY (optional, limits the token to one repo),
 *      TOKEN_ENV_NAME (default TF_GITHUB_TOKEN).
 */
import { appendFileSync, readFileSync, rmSync } from "node:fs";
import { createInstallationToken } from "./lib/github-app.mjs";

const { GITHUB_APP_ID, GITHUB_APP_INSTALLATION_ID, GITHUB_APP_PEM_PATH, GITHUB_ENV } = process.env;
const tokenEnvName = process.env.TOKEN_ENV_NAME || "TF_GITHUB_TOKEN";
const repository = process.env.GITHUB_APP_REPOSITORY;

const missing = ["GITHUB_APP_ID", "GITHUB_APP_INSTALLATION_ID", "GITHUB_APP_PEM_PATH", "GITHUB_ENV"].filter(
  (k) => !process.env[k],
);
if (missing.length) {
  console.error(`Missing required env: ${missing.join(", ")}`);
  process.exit(1);
}

let pem;
try {
  pem = readFileSync(GITHUB_APP_PEM_PATH, "utf8");
} finally {
  rmSync(GITHUB_APP_PEM_PATH, { force: true });
}

if (!pem.includes("PRIVATE KEY")) {
  console.error("GitHub App key file is not a PEM private key (check Key Vault secret TERRAFORM-GITHUB-APP-KEY).");
  process.exit(1);
}

try {
  const token = await createInstallationToken(
    GITHUB_APP_ID,
    GITHUB_APP_INSTALLATION_ID,
    pem,
    repository ? [repository] : undefined,
  );
  process.stdout.write(`::add-mask::${token}\n`);
  appendFileSync(GITHUB_ENV, `${tokenEnvName}=${token}\n`);
  console.log(`Exported ${tokenEnvName} (GitHub App installation token, expires in 1 hour).`);
} catch (err) {
  console.error(err instanceof Error ? err.message : "GitHub App token mint failed.");
  process.exit(1);
}
