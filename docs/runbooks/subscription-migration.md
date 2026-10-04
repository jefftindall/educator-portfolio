# Subscription migration (shared company subscription to dedicated)

**Owner:** Jeff. Run this once Tiffany's own subscription can be created. Current hosting model: [`subscription-hosting.md`](subscription-hosting.md).

## Approach: Azure resource move, not a rebuild

The site moves with `az resource move` into **same-named** resource groups in the new subscription, then Terraform state is rewritten to the new subscription ID.

Why not rebuild fresh:

- `kv-tifftindall-prod` and `kv-tifftindall-shared` have **purge protection**. Deleted vault names stay reserved for their soft-delete retention, so a rebuild cannot reuse them.
- A move keeps resource names, the SWA default hostname, the custom domain binding, and every Key Vault secret.
- Entra apps, the Cloud Application Administrator assignment, and GitHub OIDC federated credentials are **tenant** objects. The new subscription is in the same tenant, so they do not change.

Move support (Microsoft's [move-support list](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/move-support-resources)):

| Resource type | Moves across subscriptions? | Handling |
|---|---|---|
| Static Web Apps, Key Vault, storage account | Yes | Move |
| Log Analytics, App Insights, web tests | Yes | Move |
| Action groups, scheduled query rules, smart detector rules | Yes | Move |
| Metric alerts (`Microsoft.Insights/metricalerts`) | **No** | Leave behind, Terraform recreates, delete the old ones |
| Role assignments on moved resources | Dropped by Azure | Terraform recreates |
| Subscription budget | N/A in shared mode | Created by bootstrap in dedicated mode |

## Variables

Use **PowerShell 7** (`pwsh`). Windows PowerShell 5 writes `>` redirects as UTF-16, which corrupts state files.

```powershell
$OLD = "a558cbbf-b396-4d5f-b9ee-4ec191bc732b"
$NEW = "<dedicated subscription GUID>"
$RGS = "rg-tifftindall-portfolio-staging", "rg-tifftindall-portfolio-prod", "rg-tifftindall-shared", "rg-tifftindall-tfstate"
```

## 1. Prepare the dedicated subscription

1. Create the subscription in the **same tenant**. Confirm: `az account show --subscription $NEW --query tenantId`.
2. Make sure you are Owner on both subscriptions.
3. Register providers and create the destination resource groups with the **same names and tags**:

   ```powershell
   az account set --subscription $NEW
   "Microsoft.Resources","Microsoft.Storage","Microsoft.KeyVault","Microsoft.Web","Microsoft.Authorization",
   "Microsoft.Insights","Microsoft.OperationalInsights","Microsoft.AlertsManagement",
   "Microsoft.Consumption","Microsoft.CostManagement" | ForEach-Object { az provider register --namespace $_ --wait }

   foreach ($rg in $RGS) {
     az group create --name $rg --location eastus2 --tags project=tifftindall-portfolio managed=terraform -o none
   }
   ```

   Exact tags are corrected by the bootstrap apply in step 6.

## 2. Freeze changes

```powershell
gh workflow disable cd-main.yml --repo jefftindall/educator-portfolio
```

Do not merge `infra/**` PRs until step 7.

## 3. Back up state

State files contain **secret values** (Key Vault secrets, SWA keys). Keep backups outside the repo, never commit or paste them, and delete them when the migration is verified.

```powershell
az account set --subscription $OLD
$backup = "$env:USERPROFILE\tifftindall-migration"
New-Item -ItemType Directory -Force $backup | Out-Null

Copy-Item infra/bootstrap/terraform.tfstate "$backup\bootstrap.tfstate"
cd infra/environments/staging; terraform init -input=false; terraform state pull > "$backup\staging.tfstate"
cd ../prod;                    terraform init -input=false; terraform state pull > "$backup\prod.tfstate"
cd ../../..
```

## 4. Move resources

For each resource group, move everything **except metric alerts**. Validate first; a failed validation changes nothing.

```powershell
az account set --subscription $OLD
foreach ($rg in $RGS) {
  $ids = az resource list -g $rg --query "[?type!='Microsoft.Insights/metricalerts'].id" -o tsv
  if (-not $ids) { continue }
  $rgId = az group show -n $rg --query id -o tsv
  az resource invoke-action --action validateMoveResources --ids $rgId `
    --request-body (@{ resources = @($ids); targetResourceGroup = "/subscriptions/$NEW/resourceGroups/$rg" } | ConvertTo-Json -Compress)
  az resource move --destination-subscription-id $NEW --destination-group $rg --ids $ids
}
```

Notes:

- Move order is staging, prod, shared, tfstate. The tfstate account moves last so state stays reachable until the end.
- Moves take minutes and lock both resource groups while running. The site keeps serving during a SWA move.
- If a SWA move fails and the app appears in both subscriptions, **do not delete either copy**. Open an Azure support case for Static Web Apps.

## 5. Rewrite Terraform state

Resource IDs embed the subscription GUID. Replace it in each state, bump `serial`, and push.

```powershell
function Convert-State($path) {
  $text = (Get-Content $path -Raw).Replace("/subscriptions/$OLD", "/subscriptions/$NEW")
  $serial = [regex]'"serial":\s*(\d+)'
  $text = $serial.Replace($text, { param($m) '"serial": ' + ([int64]$m.Groups[1].Value + 1) }, 1)
  Set-Content "$path.new" $text -NoNewline -Encoding utf8NoBOM
}

Convert-State "$backup\bootstrap.tfstate"
Convert-State "$backup\staging.tfstate"
Convert-State "$backup\prod.tfstate"

Copy-Item "$backup\bootstrap.tfstate.new" infra/bootstrap/terraform.tfstate -Force

az account set --subscription $NEW
cd infra/environments/staging; terraform init -input=false -reconfigure; terraform state push "$backup\staging.tfstate.new"
cd ../prod;                    terraform init -input=false -reconfigure; terraform state push "$backup\prod.tfstate.new"
cd ../../..
```

The backend block has no subscription ID; it follows `az account set`, and the storage account name is unchanged. Before step 6, sanity-check that no old GUID remains: `Select-String -Path "$backup\*.new" -Pattern $OLD -SimpleMatch -Quiet` should print `False` (use `-Quiet` so state contents, which include secrets, are never printed).

## 6. Switch to dedicated mode and apply

1. In **all three** `terraform.tfvars`, set `subscription_id = "<NEW>"`. In `infra/bootstrap/terraform.tfvars` also set `subscription_mode = "dedicated"`.
2. In a PR, set `budget_start_date` in `infra/bootstrap/budget.tf` to the first day of the current month, recalculate `subscription_budget_usd` (ACS is no longer part of the estimate), and update `terraform.tfvars.example` files to the new GUID / `"dedicated"`.
3. Apply bootstrap, then staging, then prod (same commands as the deploy section of [`subscription-hosting.md`](subscription-hosting.md)), reviewing each plan.

Expected plan contents:

- **Create:** role assignments (dropped by the move), metric alerts, the subscription budget.
- **Update in place:** resource group tags, GitHub variables `AZURE_TF_SUBSCRIPTION_ID` (bootstrap) and `AZURE_SUBSCRIPTION_ID` (each env).
- **Not expected:** destroy/replace of a Key Vault, SWA, storage account, App Insights, or Log Analytics workspace. If you see one, stop and investigate before applying.

If the SWA system-assigned identity's `principal_id` changed in the move, the plan replaces `swa_kv_secrets_user`. That is safe.

## 7. Clean up and resume

1. Delete metric alerts left in the old subscription:

   ```powershell
   az account set --subscription $OLD
   foreach ($rg in $RGS) {
     az resource list -g $rg --resource-type Microsoft.Insights/metricalerts --query "[].id" -o tsv |
       ForEach-Object { az resource delete --ids $_ }
     az group delete -n $rg --yes   # only once the group is empty
   }
   ```

2. Re-enable CD and ship a no-op change through the full pipeline:

   ```powershell
   gh workflow enable cd-main.yml --repo jefftindall/educator-portfolio
   ```

3. Confirm **Verify Staging** and **Smoke Production** pass, and the custom domain still serves.
4. Delete `$backup`.
5. Update [`subscription-hosting.md`](subscription-hosting.md) and [`../setup.md`](../setup.md) to say the site is on the dedicated subscription.

## 8. Optional follow-ups

- Reintroduce Azure Communication Services (email/SMS) in bootstrap, and buy/verify the toll-free number in the dedicated subscription.
- Re-evaluate whether the Terraform SP still needs User Access Administrator on all three resource groups.

## Fallback

If the move cannot complete, rebuild in the dedicated subscription with **new** Key Vault names (purge protection reserves the old ones), re-run the custom domain runbook for the new SWA, then destroy the old stacks.
