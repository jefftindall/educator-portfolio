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

This mirrors [`.github/workflows/ci-static-analysis.yml`](.github/workflows/ci-static-analysis.yml) (PR merge gate only):

| Check | Local command |
|-------|----------------|
| Terraform fmt + TFLint + validate | `npm run lint:terraform` |
| Astro / TypeScript | `npm run check` |
| API JS syntax | `npm run lint:api` |
| Actions secret-safety | `npm run lint:actions-secrets` |

If Terraform or TFLint is missing, say so — do not skip the gate silently. Do not commit if lint fails.

### Never echo secrets

Never print secret values in workflows, scripts, logs, or commit messages. Full rules: [`.cursor/rules/never-echo-secrets.mdc`](.cursor/rules/never-echo-secrets.mdc).

### Pull requests

Every PR body follows [`.github/pull_request_template.md`](.github/pull_request_template.md). `gh pr create` does not apply the template on its own, so build the body from it:

- Keep every heading: **Summary**, **Why**, **Type of change**, **How it was tested**, **Checklist**.
- Fill in each section with real content. Summarize all commits on the branch, not just the last one, and link the issue or content-plan phase under **Why**.
- Check (`[x]`) only the boxes that are true. Leave the rest unchecked, and don't delete them.
- Under **How it was tested**, list the commands you actually ran and what you checked. Don't check `npm run lint` unless it passed.
- Remove the `<!-- -->` hint comments.
- Pass the body with `--body-file` or a heredoc. Never put secrets in it.

When you update an existing PR with new commits, update its body to match.

## Brand

Tiffany Tindall: **educator portfolio** at `tifftindall.com`, positioned as an **arts education leader** ("Arts education for all."). V1 content supports her NCAS application; see [`docs/plans/content-plan.md`](docs/plans/content-plan.md) for phases and status.

The look and voice come from [`docs/brand/style-guide.md`](docs/brand/style-guide.md): six colors, Fraunces and Source Sans 3, the gold arc motif, and first-person voice. Its "In code" section maps the guide to Tailwind utilities (`midnight`, `studio`, `spotlight`, `ivory`, `soft-stone`, `charcoal`) and components. Tailwind's default palette is turned off on purpose. Guardrails: [`.cursor/rules/tiffany-brand.mdc`](.cursor/rules/tiffany-brand.mdc).

## Public site

- Dev: `npm run dev` (Astro, port 4321). Build: `npm run build`.
- Pages live in `src/pages/`; page copy lives in `src/lib/content/`. Nav is `src/lib/nav.ts`.
- **Removed pages:** if a public URL goes away, add a 301 in [`public/staticwebapp.config.json`](public/staticwebapp.config.json) and the root [`staticwebapp.config.json`](staticwebapp.config.json), and drop or update the Playwright smoke/journey that covered it.

## Azure (Jeff only)

Terraform lives in `infra/` with `tifftindall` resource names and a **separate** tfstate account from Jacob’s and Elyse’s sites. Do not apply it unless Jeff explicitly asks. The site is temporarily hosted in a shared company subscription (`subscription_mode = "shared"`): never grant Terraform identities subscription-scope roles or add budgets/cost resources there. Hosting and the later move to a dedicated subscription: [`docs/runbooks/subscription-hosting.md`](docs/runbooks/subscription-hosting.md), [`docs/runbooks/subscription-migration.md`](docs/runbooks/subscription-migration.md). Production hostname cutover: [`docs/runbooks/custom-domain.md`](docs/runbooks/custom-domain.md). See [`docs/setup.md`](docs/setup.md).
