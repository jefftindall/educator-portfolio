/**
 * GitHub App auth helpers. Never log private keys, JWTs, or installation tokens.
 */
import { createSign } from "node:crypto";

const API = "https://api.github.com";

function base64url(input) {
  return Buffer.from(input).toString("base64url");
}

export function createAppJwt(appId, privateKeyPem) {
  const now = Math.floor(Date.now() / 1000);
  // Backdate iat for clock skew; GitHub caps exp at 10 minutes.
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64url(JSON.stringify({ iat: now - 60, exp: now + 540, iss: String(appId) }));
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${payload}`);
  return `${header}.${payload}.${signer.sign(privateKeyPem, "base64url")}`;
}

export async function githubApi(path, { method = "GET", bearer, body } = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "tifftindall-portfolio-scripts",
      ...(bearer ? { Authorization: `Bearer ${bearer}` } : {}),
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  return { status: res.status, ok: res.ok, data };
}

export async function getRepoInstallationId(appId, privateKeyPem, owner, repo) {
  const jwt = createAppJwt(appId, privateKeyPem);
  const res = await githubApi(`/repos/${owner}/${repo}/installation`, { bearer: jwt });
  return res.ok ? String(res.data.id) : null;
}

export async function createInstallationToken(appId, installationId, privateKeyPem, repositories) {
  const jwt = createAppJwt(appId, privateKeyPem);
  const res = await githubApi(`/app/installations/${installationId}/access_tokens`, {
    method: "POST",
    bearer: jwt,
    body: repositories ? { repositories } : undefined,
  });
  if (!res.ok) {
    throw new Error(`GitHub App installation token request failed (HTTP ${res.status}).`);
  }
  return res.data.token;
}
