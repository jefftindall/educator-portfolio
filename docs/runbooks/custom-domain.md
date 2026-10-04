# Runbook: production custom domain (`tifftindall.com`)

Bind the public site to **https://tifftindall.com** (apex). `www.tifftindall.com` should 301 to the apex.

Do **not** `terraform apply` from a laptop unless Jeff asks. Prod `custom_domain` defaults to `""` (not bound). Setting it to `tifftindall.com` in `infra/environments/prod/variables.tf` and merging to `main` runs **CD: main → Terraform Apply Production**.

**Known blocker (shared subscription):** Azure polls `Microsoft.Web/locations/staticSitesOperationStatuses/read` at **subscription** scope while it binds a domain. The prod Terraform identity has only resource-group roles (subscription-scope roles are not allowed in shared mode), so the apply fails with `403 AuthorizationFailed` even though Azure creates the hostname. Do the cutover after the dedicated-subscription move, or bind the hostnames as Jeff with `az staticwebapp hostname set` and then `terraform import` them.

## Azure target

| Piece | Value |
|-------|--------|
| Resource group | `rg-tifftindall-portfolio-prod` |
| Static Web App | `swa-tifftindall-portfolio-prod` |
| Default hostname | From `terraform output static_web_app_default_hostname` in `infra/environments/prod` (or Portal → Overview) |
| DNS host | Namecheap (`dns1.registrar-servers.com`) |

Canonical URL in Astro comes from `SITE_URL` at build time. **Build release** runs without a GitHub environment, so it reads a repo-level `SITE_URL` variable if one exists and otherwise uses `https://tifftindall.com`. Local `.env` stays `http://localhost:4321`.

## DNS records (Namecheap Advanced DNS)

Do not delete unrelated MX or TXT records (email, SPF, and so on).

Replace `<swa-default-hostname>` with the prod SWA default hostname from Terraform.

| When | Type | Host | Value |
|------|------|------|--------|
| **Before merge / apply** | CNAME | `www` | `<swa-default-hostname>` |
| After Azure issues the token | TXT | `asuid` | validation token (DNS only — never commit or paste into a PR) |
| After the TXT exists | ALIAS | `@` | `<swa-default-hostname>` |

Use Namecheap **ALIAS**, not URL Redirect. ALIAS keeps Azure’s global CDN. An A record pins one regional IP and is a last resort.

The `www` CNAME must exist **before** Terraform creates `www.tifftindall.com` (`cname-delegation`). If it is missing, prod apply fails.

## Cutover order

1. Add the `www` CNAME. Wait until it resolves (`Resolve-DnsName www.tifftindall.com`).
2. Set prod `custom_domain = "tifftindall.com"` and merge to `main` (or apply prod Terraform if Jeff is doing it locally). CD will:
   - Bind `tifftindall.com` (TXT validation) and `www.tifftindall.com` (CNAME)
   - Register Entra redirect URIs for both hosts
   - Set prod GitHub env var `SITE_URL=https://tifftindall.com`
   - Turn on prod availability tests against `https://tifftindall.com/`
3. While apex is still **Validating**, copy the TXT token **only into DNS**:

   ```bash
   az staticwebapp hostname list \
     --name swa-tifftindall-portfolio-prod \
     --resource-group rg-tifftindall-portfolio-prod \
     --query "[?name=='tifftindall.com'].validationToken" -o tsv
   ```

   After a successful apply, `terraform output -raw custom_domain_validation_token` from `infra/environments/prod` is the same value. Do not print it in chat, issues, or Actions comments.
4. Add the `asuid` TXT record, then the `@` ALIAS.
5. Wait until both hostnames show **Ready** in Portal → Static Web App → Custom domains (or `az staticwebapp hostname list`). Apex apply can sit in **Validating** until the TXT is public; if CD times out, add DNS and re-run **CD: main**.
6. Portal → Custom domains → set **tifftindall.com** as the default domain so `www` 301s to apex. Terraform does not set this.
7. Canonical URLs: **Build release** uses `https://tifftindall.com` unless a repo-level `SITE_URL` is set, so sitemap/canonicals are already right. Terraform still writes the prod env var on apply, but the build does not read it.

## Checks

- `https://tifftindall.com` serves the site over HTTPS (Azure issues the cert after Ready).
- `https://www.tifftindall.com` redirects to the apex.
- Page source canonical / `og:url` use `https://tifftindall.com/...`.

Availability tests may page until DNS and TLS are Ready. Search Console (`GSC-SITE-URL` in `kv-tifftindall-shared`) is a later step.
