output "resource_group_name" {
  value = azurerm_resource_group.tfstate.name
}

output "storage_account_name" {
  value = azurerm_storage_account.tfstate.name
}

output "container_name" {
  value = azurerm_storage_container.tfstate.name
}

output "backend_config_staging" {
  description = "Values already set in infra/environments/staging/backend.tf"
  value = {
    resource_group_name  = azurerm_resource_group.tfstate.name
    storage_account_name = azurerm_storage_account.tfstate.name
    container_name       = azurerm_storage_container.tfstate.name
    key                  = "educator-portfolio/staging.tfstate"
  }
}

output "backend_config_prod" {
  description = "Values already set in infra/environments/prod/backend.tf"
  value = {
    resource_group_name  = azurerm_resource_group.tfstate.name
    storage_account_name = azurerm_storage_account.tfstate.name
    container_name       = azurerm_storage_container.tfstate.name
    key                  = "educator-portfolio/prod.tfstate"
  }
}

output "terraform_client_id" {
  description = "Entra application (client) ID for GitHub Actions Terraform OIDC"
  value       = azuread_application.terraform.client_id
}

output "terraform_tenant_id" {
  value = data.azurerm_client_config.current.tenant_id
}

output "terraform_subscription_id" {
  value = data.azurerm_client_config.current.subscription_id
}

output "terraform_oidc_subjects" {
  description = "Federated credential subjects expected by Entra for Terraform workflows"
  value = [
    "repo:${local.github_oidc_repo}:environment:staging",
    "repo:${local.github_oidc_repo}:environment:prod",
    "repo:${local.github_oidc_repo}:pull_request",
  ]
}

output "build_client_id" {
  description = "Entra application (client) ID for CD's Build release job"
  value       = azuread_application.build.client_id
}

output "build_oidc_subject" {
  value = azuread_application_federated_identity_credential.build_main.subject
}

output "shared_key_vault_name" {
  description = "Foundational vault for site-build secrets shared by staging and prod"
  value       = azurerm_key_vault.shared.name
}

output "shared_key_vault_resource_group_name" {
  value = azurerm_resource_group.shared.name
}

output "shared_key_vault_uri" {
  value = azurerm_key_vault.shared.vault_uri
}

output "app_resource_group_names" {
  description = "Per-environment resource groups (env stacks data-source these)"
  value       = { for env, rg in azurerm_resource_group.app : env => rg.name }
}

output "subscription_mode" {
  value = var.subscription_mode
}
