variable "subscription_id" {
  type        = string
  description = "Host subscription (terraform.tfvars locally, TF_VAR_subscription_id in CI). Must match bootstrap."

  validation {
    condition     = can(regex("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$", var.subscription_id))
    error_message = "subscription_id must be a valid Azure subscription GUID."
  }

  validation {
    condition     = var.subscription_id != "bf40ce12-d60e-4d58-8954-9f43445ca2af"
    error_message = "Do not use Jacob's Azure subscription."
  }
}

variable "custom_domain" {
  type        = string
  description = "Production custom domain (apex). Empty until DNS cutover; setting it and merging to main binds it via CD (docs/runbooks/custom-domain.md)."
  default     = ""
}

variable "additional_auth_hostnames" {
  type        = list(string)
  description = "Extra hostnames allowed to complete Entra sign-in (Azure SWA hostname is added automatically)"
  default     = []
}

variable "github_owner" {
  type        = string
  description = "GitHub org or user that owns the portfolio repo"
  default     = "jefftindall"
}

variable "github_owner_id" {
  type        = string
  description = "Numeric GitHub owner ID for OIDC subject claims"
  default     = "10339968"
}

variable "github_repo" {
  type    = string
  default = "educator-portfolio"
}

variable "github_repo_id" {
  type        = string
  description = "Numeric GitHub repository ID for OIDC subject claims"
  default     = "1350927100"
}

variable "github_branch" {
  type        = string
  description = "Branch Studio commits to / prod deploys from"
  default     = "main"
}

variable "manage_github_actions" {
  type        = bool
  description = "Create GitHub Actions environment variables via Terraform (needs GITHUB_TOKEN/GH_TOKEN)"
  default     = true
}

variable "ga_measurement_id" {
  type        = string
  description = "Optional GA4 Measurement ID (empty until analytics is enabled)"
  default     = ""
}

