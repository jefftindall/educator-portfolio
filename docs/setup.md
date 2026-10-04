# Initial setup

Local development first. **Do not run `terraform apply` unless Jeff asks.** Custom domain cutover is [`runbooks/custom-domain.md`](runbooks/custom-domain.md).

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

Site: [http://localhost:4321](http://localhost:4321).

```bash
npm run lint
npm run build
```

Work on a branch. Jeff reviews `main`.

## Azure later (Jeff only)

**Current host:** the shared company subscription `a558cbbf-b396-4d5f-b9ee-4ec191bc732b` (`subscription_mode = "shared"`), because a dedicated subscription can’t be created yet. **Target:** Tiffany’s own subscription (`subscription_mode = "dedicated"`). Never Jacob’s or Elyse’s subscriptions.

- Deploy today: [`runbooks/subscription-hosting.md`](runbooks/subscription-hosting.md)
- Move later: [`runbooks/subscription-migration.md`](runbooks/subscription-migration.md)

Region default is `eastus2`. All Azure and Entra names use the `tifftindall` prefix, separate from other family sites:

| Piece | Name |
|-------|----------------|
| Tfstate RG / account | `rg-tifftindall-tfstate` / `sttifftindalltfstateeu2` |
| State keys | `educator-portfolio/staging.tfstate`, `educator-portfolio/prod.tfstate` |
| App RGs (created by bootstrap) | `rg-tifftindall-portfolio-staging`, `rg-tifftindall-portfolio-prod` |
| Key Vaults | `kv-tifftindall-staging`, `kv-tifftindall-prod`, `kv-tifftindall-shared` |
| SWA | `swa-tifftindall-portfolio-staging`, `swa-tifftindall-portfolio-prod` |
| GitHub repo | `jefftindall/educator-portfolio` (numeric id `1350927100`) |

When Jeff is ready, follow the deploy section of [`runbooks/subscription-hosting.md`](runbooks/subscription-hosting.md): bootstrap, shared vault secrets, staging, prod, then merge to `main` for CD. Production custom domain (`tifftindall.com`): follow [`runbooks/custom-domain.md`](runbooks/custom-domain.md) **before** merging a `custom_domain` change to `main`.

Do not point this repo at Jacob’s or Elyse’s tfstate accounts, subscriptions, or Key Vaults.
