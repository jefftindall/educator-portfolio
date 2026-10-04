# Company subscription that hosts the site until Tiffany's own subscription exists.
locals {
  shared_host_subscription_id = "a558cbbf-b396-4d5f-b9ee-4ec191bc732b"
  dedicated_subscription      = var.subscription_mode == "dedicated"
}

resource "terraform_data" "subscription_mode_guard" {
  lifecycle {
    precondition {
      condition     = !(local.dedicated_subscription && var.subscription_id == local.shared_host_subscription_id)
      error_message = "subscription_mode = \"dedicated\" cannot target the shared company subscription. Use \"shared\" there."
    }
  }
}

resource "azurerm_resource_group" "tfstate" {
  name     = var.resource_group_name
  location = var.location
  tags     = var.tags
}

resource "azurerm_storage_account" "tfstate" {
  name                     = var.storage_account_name
  resource_group_name      = azurerm_resource_group.tfstate.name
  location                 = azurerm_resource_group.tfstate.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  min_tls_version          = "TLS1_2"

  blob_properties {
    versioning_enabled = true
  }

  tags = var.tags
}

resource "azurerm_storage_container" "tfstate" {
  name                  = var.container_name
  storage_account_id    = azurerm_storage_account.tfstate.id
  container_access_type = "private"
}

# Env stacks data-source these; the Terraform SP's roles are scoped to them.
resource "azurerm_resource_group" "app" {
  for_each = var.app_resource_group_names

  name     = each.value
  location = var.location
  tags = {
    environment = each.key
    project     = var.tags["project"]
    managed     = "terraform"
  }
}
