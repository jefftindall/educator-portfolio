# OPS-P4-001 — Subscription monthly budget = ceil(expected retail × 1.25).
# Expected breakdown SoT: docs/runbooks/cost-and-quotas.md (recalculate on infra change).
# Threshold emails go to ALERT-EMAIL only (ops). Monthly digests cover both contacts.
# Dedicated subscription only: a subscription budget in the shared company
# subscription would track spend that is not Tiffany's.

data "azurerm_subscription" "current" {
  count           = local.dedicated_subscription ? 1 : 0
  subscription_id = var.subscription_id
}

data "azurerm_key_vault_secret" "alert_email_for_budget" {
  count        = local.dedicated_subscription ? 1 : 0
  name         = azurerm_key_vault_secret.alert_email.name
  key_vault_id = azurerm_key_vault.shared.id
  depends_on   = [azurerm_key_vault_secret.alert_email]
}

locals {
  budget_alert_email_raw = local.dedicated_subscription ? trimspace(data.azurerm_key_vault_secret.alert_email_for_budget[0].value) : ""
  budget_alert_email_configured = (
    local.budget_alert_email_raw != "" &&
    local.budget_alert_email_raw != "REPLACE_ME"
  )
  # Fixed start (first of month). Do not roll this forward — recreating the budget resets history.
  budget_start_date = "2026-08-01T00:00:00Z"
  # Recalculate when moving to the dedicated subscription (ACS was removed; prior estimate included it).
  subscription_budget_usd = 34
}

resource "azurerm_consumption_budget_subscription" "monthly" {
  count           = local.dedicated_subscription ? 1 : 0
  name            = "budget-tifftindall-portfolio-monthly"
  subscription_id = data.azurerm_subscription.current[0].id

  amount     = local.subscription_budget_usd
  time_grain = "Monthly"

  time_period {
    start_date = local.budget_start_date
  }

  notification {
    enabled        = true
    threshold      = 80.0
    operator       = "GreaterThan"
    threshold_type = "Actual"

    contact_emails = local.budget_alert_email_configured ? [local.budget_alert_email_raw] : []
    # Required when ALERT-EMAIL is still REPLACE_ME so the notification block is valid.
    contact_roles = local.budget_alert_email_configured ? [] : ["Owner"]
  }

  notification {
    enabled        = true
    threshold      = 100.0
    operator       = "GreaterThan"
    threshold_type = "Actual"

    contact_emails = local.budget_alert_email_configured ? [local.budget_alert_email_raw] : []
    contact_roles  = local.budget_alert_email_configured ? [] : ["Owner"]
  }
}
