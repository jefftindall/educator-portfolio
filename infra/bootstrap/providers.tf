terraform {
  required_version = ">= 1.5.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
    azuread = {
      source  = "hashicorp/azuread"
      version = "~> 3.0"
    }
    github = {
      source  = "integrations/github"
      version = "~> 6.0"
    }
  }

  # Local state only — this stack creates the remote backend used by staging/prod.
  backend "local" {
    path = "terraform.tfstate"
  }
}

# Bootstrap is applied by a subscription Owner, so it registers every provider the
# env stacks need; the RG-scoped Terraform SP cannot register providers itself.
provider "azurerm" {
  subscription_id                 = var.subscription_id
  resource_provider_registrations = "none"
  resource_providers_to_register = concat(
    [
      "Microsoft.Resources",
      "Microsoft.Storage",
      "Microsoft.KeyVault",
      "Microsoft.Web",
      "Microsoft.Authorization",
      "Microsoft.Insights",
      "Microsoft.OperationalInsights",
      "Microsoft.AlertsManagement",
    ],
    var.subscription_mode == "dedicated" ? ["Microsoft.Consumption", "Microsoft.CostManagement"] : [],
  )
  features {}
}

provider "azuread" {}

provider "github" {
  owner = var.github_owner
}
