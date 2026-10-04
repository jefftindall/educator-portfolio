# Runbook: testing strategy (staging → production)

Post-deploy Playwright checks for Tiffany’s public site. CI (`npm run lint` / **CI: static analysis**) stays the PR merge gate and does **not** run these suites.

## What runs today

| Layer | When | Command / job | What it validates |
|-------|------|---------------|-------------------|
| CI: static analysis | Every PR to `main` | `npm run lint` | Terraform, Astro check, API syntax, Actions secret-safety |
| Terraform plan | PRs touching `infra/` | CI **Plan staging/prod** | Infra diff review |
| **Build release** | App or infra change on `main` | Job **Build release** | One `npm run build`; same artifact to staging and prod |
| **Verify Staging** | After staging deploy | `npm run test:smoke` then `npm run test:journey` | V1 pages, media, contact, visitor journeys, SEO basics. **Blocks production.** |
| **Smoke Production** | After prod deploy | `npm run test:smoke` | Same smoke on the public host. No auto-rollback. |

Terraform apply jobs run only when `infra/**` or the CD workflow file changed. Docs-only pushes skip CD.

## Layout

```
tests/
  helpers/
    content.ts       # BRAND, hero phrase, PUBLIC_ROUTES for assertions
    propagation.ts   # waitForOk — SWA CDN propagation polling
  smoke/
    public.spec.ts   # Home, V1 routes, media, robots/sitemap, contact, API health
  journeys/
    visitor.spec.ts  # VISIT-01 landing, VISIT-02 home → philosophy
    seo.spec.ts      # J-SEO-01 sitemap routes + home head tags

playwright.smoke.config.ts
playwright.journey.config.ts
```

### Smoke (`npm run test:smoke`)

Home shows **Tiffany Tindall** and the hero headline; every V1 route responds; page videos and posters are served; `robots.txt` + sitemap; contact page has a `mailto:` link; `/api/health` on SWA hosts. Desktop + mobile.

### Journeys (`npm run test:journey`)

| ID | Flow |
|----|------|
| `VISIT-01` | Home greeting |
| `VISIT-02` | Home → Teaching Philosophy |
| `J-SEO-01` | Sitemap lists public routes; title/canonical/description on `/` |

When you add pages or flows, extend these suites in the same PR ([`.cursor/rules/post-deploy-tests.mdc`](../../.cursor/rules/post-deploy-tests.mdc)).

## Local

```bash
npx playwright install chromium
npm run preview
# another terminal:
BASE_URL=http://localhost:4321 npm run test:smoke
BASE_URL=http://localhost:4321 npm run test:journey
```
