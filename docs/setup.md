# Initial setup

Local development first. **Do not run `terraform apply` unless Jeff asks.** Staging and prod Azure will live in Jeff's subscription; custom domain cutover is [`runbooks/custom-domain.md`](runbooks/custom-domain.md).

## Local (Tiffany + Jeff)

Prerequisites: Node.js >= 22.12.

```bash
copy .env.example .env
```

Set `SITE_CONTACT_EMAIL` to a professional contact address. Never commit `.env`.

```bash
npm install
npm run dev
```

Site: [http://localhost:4321](http://localhost:4321) — plain `Hello World` until the content phase.

```bash
npm run lint
npm run build
```

Work on a branch. Jeff reviews `main`.

## Azure later (Jeff only)

Same subscription and region as the sibling sites (`eastus2`), **separate** resource names and tfstate:

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
2. `cd infra/bootstrap` → `terraform init` / `plan` / `apply` (local state — back it up; it is gitignored). Bootstrap does **not** look up staging/prod GitHub Actions apps — those do not exist yet.
3. Apply `infra/environments/staging`, then `prod` (each grants its own GHA identity on `kv-tiffany-shared`)
4. Put `SITE-CONTACT-EMAIL` in `kv-tiffany-shared` (not in git)
5. Production custom domain (`tiffanytindall.com`): follow [`docs/runbooks/custom-domain.md`](runbooks/custom-domain.md) **before** merging a `custom_domain` change to `main` (CD applies prod Terraform)
6. CD workflow (`.github/workflows/azure-static-web-apps.yml`) deploys on merge to `main`. Terraform apply jobs run only when `infra/` changed; otherwise they skip. Staging must pass **Verify Staging** (Playwright smoke + journeys) before prod. See [`docs/runbooks/testing-strategy.md`](runbooks/testing-strategy.md).

Merges to `main` go through a pull request. The **Protect main** ruleset requires CI jobs to pass; CI does not re-run on `main` after merge.

Studio, inquiry forms, Turnstile, and GA4 wait for a later phase.

## Do not share sibling Azure resources

Do not point this repo at another portfolio's tfstate account, Key Vault, or GitHub App. Tiffany gets her own bootstrap.
