# Initial setup

Local development first. **Do not run `terraform apply` unless Jeff asks.** Staging and prod Azure use the same subscription pattern as Jacob’s site; custom domain cutover is [`runbooks/custom-domain.md`](runbooks/custom-domain.md).

## Local (Tiffany + Jeff)

Prerequisites: Node.js >= 22.12.

```bash
cp .env.example .env
```

Set `SITE_CONTACT_EMAIL` to a managed contact address. Never commit `.env`.

```bash
npm install
npm run dev
```

Site: [http://localhost:4321](http://localhost:4321) — phase 1 shows **Hello, world** only.

```bash
npm run lint
npm run build
```

Work on a branch. Jeff reviews `main`.

## Azure later (Jeff only)

Same subscription and region as Jacob’s site (`eastus2`), **separate** resource names and tfstate:

| Piece | Tiffany name |
|-------|----------------|
| Tfstate RG / account | `rg-tiffany-tfstate` / `sttiffanytfstateeu2` |
| State keys | `educator-portfolio/staging.tfstate`, `educator-portfolio/prod.tfstate` |
| App RGs | `rg-tiffany-portfolio-staging`, `rg-tiffany-portfolio-prod` |
| Key Vaults | `kv-tiffany-staging`, `kv-tiffany-prod`, `kv-tiffany-shared` |
| SWA | `swa-tiffany-portfolio-staging`, `swa-tiffany-portfolio-prod` |
| GitHub repo | `jefftindall/educator-portfolio` (numeric id `1350927100`) |

When Jeff is ready:

1. `az login` and set the subscription
2. `cd infra/bootstrap` → `terraform init` / `plan` / `apply` (local state — back it up; it is gitignored)
3. Apply `infra/environments/staging`, then `prod`
4. Put `SITE-CONTACT-EMAIL` in `kv-tiffany-shared` (not in git)
5. Production custom domain (`tifftindall.com`): follow [`docs/runbooks/custom-domain.md`](runbooks/custom-domain.md) **before** merging a `custom_domain` change to `main`
6. CD workflow (`.github/workflows/cd-main.yml`) deploys on merge to `main`

Do not point this repo at Jacob’s or Elyse’s tfstate accounts or Key Vaults.
