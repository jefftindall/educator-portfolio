variable "subscription_id" {
  type        = string
  description = "Azure subscription for Tiffany's portfolio (set in terraform.tfvars — not Jacob's subscription)"

  validation {
    condition     = can(regex("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$", var.subscription_id))
    error_message = "subscription_id must be a valid Azure subscription GUID in terraform.tfvars."
  }

  validation {
    condition     = var.subscription_id != "bf40ce12-d60e-4d58-8954-9f43445ca2af"
    error_message = "Do not use Jacob's Azure subscription; use Tiffany's own subscription."
  }
}

variable "subscription_mode" {
  type        = string
  description = "\"shared\" while hosted in the company subscription (no budget, RG-scoped RBAC only); \"dedicated\" once Tiffany has her own subscription. See docs/runbooks/subscription-hosting.md."

  validation {
    condition     = contains(["shared", "dedicated"], var.subscription_mode)
    error_message = "subscription_mode must be \"shared\" or \"dedicated\"."
  }
}

variable "location" {
  type        = string
  description = "Azure region for Terraform remote state storage"
  default     = "eastus2"
}

variable "resource_group_name" {
  type        = string
  description = "Shared resource group for Terraform state"
  default     = "rg-tifftindall-tfstate"
}

variable "storage_account_name" {
  type        = string
  description = "Globally unique storage account name (3–24 lowercase alphanumeric)"
  default     = "sttifftindalltfstateeu2"
}

variable "app_resource_group_names" {
  type        = map(string)
  description = "Per-environment app resource groups. Bootstrap owns them so the Terraform SP needs only RG-scoped roles."
  default = {
    staging = "rg-tifftindall-portfolio-staging"
    prod    = "rg-tifftindall-portfolio-prod"
  }
}

variable "container_name" {
  type        = string
  description = "Blob container for environment state files"
  default     = "tfstate"
}

variable "tags" {
  type = map(string)
  default = {
    project = "tifftindall-portfolio"
    purpose = "terraform-remote-state"
    managed = "terraform"
  }
}

variable "github_owner" {
  type        = string
  description = "GitHub org or user that owns the portfolio repo"
  default     = "jefftindall"
}

variable "github_owner_id" {
  type        = string
  description = "Numeric GitHub owner ID used in OIDC subject claims"
  default     = "10339968"
}

variable "github_repo" {
  type        = string
  description = "GitHub repository name"
  default     = "educator-portfolio"
}

variable "github_repo_id" {
  type        = string
  description = "Numeric GitHub repository ID used in OIDC subject claims"
  default     = "1350927100"
}

variable "github_app_id" {
  type        = string
  description = "GitHub App used by CI/CD Terraform for the GitHub provider (from scripts/create-github-app.mjs). Empty until created."
  default     = ""
}

variable "github_app_installation_id" {
  type        = string
  description = "Installation ID of that GitHub App on the repo (from scripts/create-github-app.mjs)."
  default     = ""
}

variable "manage_github_actions" {
  type        = bool
  description = "When true, set repo-level AZURE_TF_* Actions variables (requires GH_TOKEN)"
  default     = true
}
