# Tiffany Tindall — educator portfolio

Personal site for **Tiffany Tindall** (`tifftindall.com`). Built with Astro on the same platform as [Jacob’s portfolio](https://github.com/jefftindall/jacobs-portfolio): Azure Static Web Apps, Terraform, GitHub Actions, and Playwright post-deploy checks.

The site supports Tiffany’s NCAS National Arts Standards (Dance) application. V1 pages are Home, Standards & Leadership, Teaching Philosophy, Dance for Every Body, and CV & Contact. Phases and remaining work: [content plan](docs/plans/content-plan.md).

## Quick start

You need [Node.js](https://nodejs.org/) 22 or newer.

```bash
cp .env.example .env
# Set SITE_CONTACT_EMAIL (never commit .env)

npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

### Lint

```bash
npm run lint
```

Run this before every commit. It checks Terraform, the Astro site, the API stub, and GitHub Actions secret-safety.

## Documentation

- [AGENTS.md](AGENTS.md) — rules for Cursor (brand, lint)
- [Brand style guide](docs/brand/style-guide.md) — colors, type, wordmark, voice, accessibility, and how they map to code
- [Content plan](docs/plans/content-plan.md) — phases, what's done, and what's left (NCAS launch Oct 18)
- [Initial setup](docs/setup.md) — local first; Azure later (do not apply unless Jeff asks)
- [Custom domain](docs/runbooks/custom-domain.md) — bind `tifftindall.com` on prod (Jeff only)
- [Testing strategy](docs/runbooks/testing-strategy.md) — post-deploy staging journeys and production smoke

## Security model

When Azure is applied, only Jeff provisions secrets. Contact email stays in `.env` / Key Vault, never in git.
