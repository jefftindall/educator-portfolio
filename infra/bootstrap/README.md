# Bootstrap Terraform remote state + Terraform OIDC (run once, local state).
# Applied by Jeff as subscription Owner. Hosting model and deploy steps:
#   docs/runbooks/subscription-hosting.md (today: shared company subscription)
#   docs/runbooks/subscription-migration.md (later: move to a dedicated subscription)
#
#   export GH_TOKEN="$(gh auth token)"   # needs admin access to repo variables
#   cd infra/bootstrap
#   terraform init -input=false
#   terraform plan -input=false -out=tfplan
#   terraform apply tfplan
#
# Creates:
#   Resource group:    rg-tifftindall-tfstate
#   Storage account:   sttifftindalltfstateeu2
#   Container:         tfstate
#   Shared RG/vault:   rg-tifftindall-shared / kv-tifftindall-shared (SITE-*, Turnstile, ALERT-*, GA-*, GSC-*)
#   App RGs:           rg-tifftindall-portfolio-staging / rg-tifftindall-portfolio-prod
#                      (env stacks data-source these; they do not create them)
#   Subscription budget: budget-tifftindall-portfolio-monthly — subscription_mode = "dedicated" only
#   Region:            eastus2
#   Subscription:      subscription_id + subscription_mode in terraform.tfvars
#   Entra app:         tifftindall-portfolio-gha-terraform (OIDC for plan/apply)
#   Repo variables:    AZURE_TF_CLIENT_ID, AZURE_TF_TENANT_ID, AZURE_TF_SUBSCRIPTION_ID,
#                      AZURE_SHARED_KEY_VAULT_NAME
#
# The Terraform SP gets Contributor, User Access Administrator, and Key Vault Secrets
# Officer on the shared + app resource groups only (never subscription scope), plus
# Storage Blob Data Contributor on the tfstate account. Bootstrap also registers the
# resource providers env stacks need, because the RG-scoped SP cannot.
# Add repo secret TF_GITHUB_TOKEN (PAT with environment variable access) for the
# GitHub provider in CI.
#
# Staging/prod backends are preconfigured to use this account with distinct state keys.
# Apply bootstrap first (it does not require env GitHub Actions apps). Then apply
# staging and prod; each env grants its own GHA identity on kv-tifftindall-shared.
# Re-apply bootstrap after pulling OIDC / shared vault / budget changes so Actions can run Terraform.
# Populate shared vault secrets per docs/runbooks/rotate-secrets.md before CD builds.
# In dedicated mode, set ALERT-EMAIL before expecting budget threshold emails (otherwise Owners are notified).
# GA-PROPERTY-ID / GA-DATA-API-SA-JSON: see docs/runbooks/ga-data-api-access.md (OPS-P5 scorecard).
# GSC-SITE-URL starts as REPLACE_ME until a public domain exists; GSC-DATA-API-SA-JSON falls back to GA SA:
#   docs/runbooks/gsc-data-api-access.md (SEARCH-P4 search signals).
