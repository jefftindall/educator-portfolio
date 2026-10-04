#!/usr/bin/env node
/**
 * Terraform fmt + TFLint + validate (no remote backend).
 */
import { spawnSync } from "node:child_process";
import { rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
let failed = false;

/** Placeholder only for `terraform validate` (real ID goes in terraform.tfvars). */
const validateSubscriptionId =
  process.env.TF_VAR_subscription_id ?? "11111111-1111-1111-1111-111111111111";

const terraformEnv = {
  ...process.env,
  TF_VAR_subscription_id: validateSubscriptionId,
  TF_VAR_subscription_mode: process.env.TF_VAR_subscription_mode ?? "shared",
};

function run(label, command, args, cwd = root) {
  console.log(`\n==> ${label}`);
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
    cwd,
    env: terraformEnv,
  });
  if (result.status !== 0) {
    failed = true;
    console.error(`FAILED: ${label}`);
  }
}

function requireCmd(cmd, hint) {
  const probe = spawnSync(cmd, ["--version"], {
    stdio: "ignore",
    shell: process.platform === "win32",
  });
  if (probe.status !== 0) {
    console.error(`Missing required tool '${cmd}'. ${hint}`);
    failed = true;
    return false;
  }
  return true;
}

const hasTerraform = requireCmd(
  "terraform",
  "Install Terraform >= 1.5 (https://developer.hashicorp.com/terraform/install).",
);
const hasTflint = requireCmd(
  "tflint",
  "Install TFLint (https://github.com/terraform-linters/tflint#installation).",
);

if (hasTerraform) {
  run("terraform fmt -check", "terraform", ["fmt", "-check", "-recursive", "infra"]);
}

if (hasTflint) {
  run("tflint --init", "tflint", ["--init"], join(root, "infra"));
  run("tflint --recursive", "tflint", ["--recursive", "--format", "compact"], join(root, "infra"));
}

if (hasTerraform) {
  for (const dir of [
    "infra/bootstrap",
    "infra/environments/staging",
    "infra/environments/prod",
  ]) {
    const abs = join(root, dir);
    rmSync(join(abs, ".terraform"), { recursive: true, force: true });
    run(
      `terraform init (${dir})`,
      "terraform",
      ["init", "-backend=false", "-input=false"],
      abs,
    );
    if (!failed) {
      run(`terraform validate (${dir})`, "terraform", ["validate"], abs);
    }
  }
}

if (failed) {
  console.error("\nTerraform lint failed.");
  process.exit(1);
}

console.log("\nTerraform lint passed.");
