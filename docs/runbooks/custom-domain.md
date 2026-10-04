# Runbook: production custom domain (`www.tifftindall.com`)

The canonical public site is **https://www.tifftindall.com**. The apex `tifftindall.com` is a GoDaddy domain forward to `https://www.tifftindall.com`.

GoDaddy DNS cannot put an ALIAS / flattened CNAME on the apex, so the apex is **not** served by the Static Web App. The forward only redirects `/`; every other apex path (`/contact`, `/robots.txt`, `/api/health`, …) returns 404. That is why canonicals, the sitemap, availability tests, and production smoke all use `www`.

Do **not** `terraform apply` from a laptop unless Jeff asks. Merging `custom_domain` to `main` runs **CD: main → Terraform Apply Production**.

## Azure target

| Piece | Value |
|-------|--------|
| Resource group | `rg-tifftindall-portfolio-prod` |
| Static Web App | `swa-tifftindall-portfolio-prod` |
| Default hostname | From `terraform output static_web_app_default_hostname` in `infra/environments/prod` (or Portal → Overview) |
| DNS host | GoDaddy (`ns57.domaincontrol.com`, `ns58.domaincontrol.com`) |

Canonical URL in Astro comes from `SITE_URL` at build time. **Build release** runs without a GitHub environment, so it reads a repo-level `SITE_URL` variable if one exists and otherwise uses `https://www.tifftindall.com`. Local `.env` stays `http://localhost:4321`.

## DNS records (GoDaddy)

Do not delete unrelated MX or TXT records (email, SPF, and so on).

Replace `<swa-default-hostname>` with the prod SWA default hostname from Terraform.

| When | Type / setting | Host | Value |
|------|------|------|--------|
| **Before merge / apply** | CNAME | `www` | `<swa-default-hostname>` |
| After Azure issues the token | TXT | `asuid` / `@` | validation token (DNS only — never commit or paste into a PR) |
| Any time | Domain forwarding (301) | `tifftindall.com` | `https://www.tifftindall.com` |

The `www` CNAME must exist **before** Terraform creates `www.tifftindall.com` (`cname-delegation`). If it is missing, prod apply fails.

Terraform still binds the apex on the Static Web App (TXT validation) so a later move to a DNS host with ALIAS support (Azure DNS, Cloudflare) only needs a DNS change plus flipping the canonical back.

## Cutover order

1. Add the `www` CNAME. Wait until it resolves (`Resolve-DnsName www.tifftindall.com`).
2. Merge the `custom_domain` change to `main`. CD will:
   - Bind `tifftindall.com` (TXT validation) and `www.tifftindall.com` (CNAME)
   - Register Entra redirect URIs for both hosts
   - Set prod GitHub env var `SITE_URL=https://www.tifftindall.com`
   - Turn on prod availability tests against `https://www.tifftindall.com/`
3. While apex is still **Validating**, copy the TXT token **only into DNS**:

   ```bash
   az staticwebapp hostname list \
     --name swa-tifftindall-portfolio-prod \
     --resource-group rg-tifftindall-portfolio-prod \
     --query "[?name=='tifftindall.com'].validationToken" -o tsv
   ```

   After a successful apply, `terraform output -raw custom_domain_validation_token` from `infra/environments/prod` is the same value. Do not print it in chat, issues, or Actions comments.
4. Add the TXT record and the apex domain forward to `https://www.tifftindall.com`.
5. Wait until both hostnames show **Ready** in Portal → Static Web App → Custom domains (or `az staticwebapp hostname list`). Apex apply can sit in **Validating** until the TXT is public; if CD times out, add DNS and re-run **CD: main**.
6. Optional: Portal → Custom domains → set **www.tifftindall.com** as the default domain so the `*.azurestaticapps.net` host 301s to it. Terraform does not set this.
7. **Smoke Production** targets the Ready `www` custom domain (see `Resolve production hostname` in `cd-main.yml`), never the apex forward.

## Checks

- `https://www.tifftindall.com` serves the site over HTTPS on every route.
- `https://tifftindall.com/` redirects to `https://www.tifftindall.com`.
- Page source canonical / `og:url` and `sitemap-0.xml` use `https://www.tifftindall.com/...`.

Availability tests may page until DNS and TLS are Ready. Search Console (`GSC-SITE-URL` in `kv-tifftindall-shared`) is a later step.
