# Entra app for CD's environment-less "Build release" job. It lives in bootstrap so a
# fresh setup can build before any env stack exists, and it can only read the SITE-*
# secrets the Astro build embeds. Separate from the Terraform identity on purpose:
# the build runs third-party npm install scripts.
resource "azuread_application" "build" {
  display_name     = "tifftindall-portfolio-gha-build"
  owners           = [data.azuread_client_config.current.object_id]
  sign_in_audience = "AzureADMyOrg"
}

resource "azuread_service_principal" "build" {
  client_id                    = azuread_application.build.client_id
  app_role_assignment_required = false
  owners                       = [data.azuread_client_config.current.object_id]
}

# A job with no `environment:` on a push to main presents this subject.
resource "azuread_application_federated_identity_credential" "build_main" {
  application_id = azuread_application.build.id
  display_name   = "github-ref-${var.github_branch}"
  description    = "GitHub Actions Build release on ${var.github_branch}"
  audiences      = ["api://AzureADTokenExchange"]
  issuer         = "https://token.actions.githubusercontent.com"
  subject        = "repo:${local.github_oidc_repo}:ref:refs/heads/${var.github_branch}"
}

locals {
  build_site_secrets = {
    site_contact_email = azurerm_key_vault_secret.site_contact_email
    site_contact_phone = azurerm_key_vault_secret.site_contact_phone
    site_date_of_birth = azurerm_key_vault_secret.site_date_of_birth
  }
}

resource "azurerm_role_assignment" "build_site_secret_user" {
  for_each = local.build_site_secrets

  scope                = each.value.resource_versionless_id
  role_definition_name = "Key Vault Secrets User"
  principal_id         = azuread_service_principal.build.object_id
}

resource "github_actions_variable" "azure_build_client_id" {
  count         = var.manage_github_actions ? 1 : 0
  repository    = var.github_repo
  variable_name = "AZURE_BUILD_CLIENT_ID"
  value         = azuread_application.build.client_id
}

resource "github_actions_variable" "azure_build_tenant_id" {
  count         = var.manage_github_actions ? 1 : 0
  repository    = var.github_repo
  variable_name = "AZURE_BUILD_TENANT_ID"
  value         = data.azurerm_client_config.current.tenant_id
}
