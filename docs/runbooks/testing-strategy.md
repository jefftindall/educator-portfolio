# Runbook: testing strategy (staging → production)

Post-deploy Playwright checks for Tiffany's public site. CI (`npm run lint` / **CI: static analysis**) stays the PR merge gate and does **not** run these suites.

## What runs today

| Layer | When | Command / job | What it validates |
|-------|------|---------------|-------------------|
| CI: static analysis | Every PR to `main` | `npm run lint` | Terraform, Astro check, API syntax, Actions secret-safety |
| Terraform plan | PRs touching `infra/` | CI **Plan staging/prod** | Infra diff review |
| **Build release** | App or infra change on `main` | Job **Build release** | One `npm run build`; same artifact to staging and prod |
| **Verify Staging** | After staging deploy | `npm run test:smoke` then `npm run test:journey` | Homepage + journeys (desktop + mobile). **Blocks production.** |
| **Smoke Production** | After prod deploy | `npm run test:smoke` | Homepage, robots/sitemap, API health. No auto-rollback. |

Terraform apply jobs run only when `infra/**` or the CD workflow file changed. Docs-only pushes skip CD.

## Layout

```
tests/
  helpers/
    propagation.ts   # waitForOk — SWA CDN propagation polling
  smoke/
    public.spec.ts   # Homepage, robots/sitemap, API health
  journeys/
    visitor.spec.ts  # VISIT-01 (home)
    seo.spec.ts      # J-SEO-01 (title/canonical)

playwright.smoke.config.ts
playwright.journey.config.ts
```

### Smoke (`npm run test:smoke`)

Home (`Hello World`), `robots.txt` + sitemap, `/api/health` on SWA hosts. Desktop + mobile.

### Journeys (`npm run test:journey`)

| ID | Flow |
|----|------|
| `VISIT-01` | Home loads and shows hello world |
| `J-SEO-01` | Title and canonical on `/` |

Expand these suites when the content phase adds pages and navigation.

## Local

```powershell
npx playwright install chromium
npm run preview
# another terminal:
$env:BASE_URL = "http://localhost:4321"
npm run test:smoke
npm run test:journey
```

Keep suites aligned with public pages — see [`.cursor/rules/post-deploy-tests.mdc`](../../.cursor/rules/post-deploy-tests.mdc).
