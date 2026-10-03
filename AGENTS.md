See README.md and docs/ for project guidance.

## Who does what

- **Tiffany** builds pages in Cursor. Local `npm run dev` only.
- **Jeff** owns Azure, secrets, production deploys, and merges to `main`.

Do not `terraform apply`, push deploy tokens, or enable un-gated CD unless Jeff explicitly asks.

The only path onto `main` is a pull request. **CI: static analysis** is the merge gate (it does not re-run after merge). **CD: main** deploys on `main`; Terraform apply is skipped when `infra/` did not change. After staging deploy, **Verify Staging** (Playwright smoke + journeys) must pass before production. After production deploy, **Smoke Production** checks the public host. See [`docs/runbooks/testing-strategy.md`](docs/runbooks/testing-strategy.md). When you add or remove public pages or flows, update those suites in the same change ([`.cursor/rules/post-deploy-tests.mdc`](.cursor/rules/post-deploy-tests.mdc)).

## Cursor Cloud

Node >= 22.12 is required. Cloud agent runtime is [`.cursor/environment.json`](.cursor/environment.json): `npm ci` for the root site and `api/`. The `site` terminal starts Astro on port 4321.

### Lint (required before commit)

```bash
npm run lint
```

This mirrors [`.github/workflows/static-analysis.yml`](.github/workflows/static-analysis.yml) (PR merge gate only):

| Check | Local command |
|-------|----------------|
| Terraform fmt + TFLint + validate | `npm run lint:terraform` |
| Astro / TypeScript | `npm run check` |
| API JS syntax | `npm run lint:api` |
| Actions secret-safety | `npm run lint:actions-secrets` |

If Terraform or TFLint is missing, say so — do not skip the gate silently. Do not commit if lint fails.

### Never echo secrets

Never print secret values in workflows, scripts, logs, or commit messages. Full rules: [`.cursor/rules/never-echo-secrets.mdc`](.cursor/rules/never-echo-secrets.mdc).

## Brand

Tiffany Tindall: **educator portfolio** at `tifftindall.com`. Phase 1 is hello world only. See [`.cursor/rules/tiffany-brand.mdc`](.cursor/rules/tiffany-brand.mdc).

## Public site

- Dev: `npm run dev` (Astro, port 4321). Build: `npm run build`.
- Phase 1: single home page (`src/pages/index.astro`).
- **Removed pages:** if a public URL goes away, add a 301 in [`public/staticwebapp.config.json`](public/staticwebapp.config.json) and the root [`staticwebapp.config.json`](staticwebapp.config.json), and drop or update the Playwright smoke/journey that covered it.

## Azure (Jeff only)

Terraform lives in `infra/` with Tiffany resource names and a **separate** tfstate account from Jacob’s and Elyse’s sites. Do not apply it unless Jeff explicitly asks. Production hostname cutover: [`docs/runbooks/custom-domain.md`](docs/runbooks/custom-domain.md). See [`docs/setup.md`](docs/setup.md).
