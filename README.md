# Tiffany Tindall — educator portfolio

Personal site for **Tiffany Tindall** (`tifftindall.com`). Built with Astro on the same platform as [Jacob’s portfolio](https://github.com/jefftindall/jacobs-portfolio): Azure Static Web Apps, Terraform, GitHub Actions, and Playwright post-deploy checks.

**Phase 1 (this repo):** infrastructure and a plain-text home page (`public/index.html` → `hello world`). **Phase 2:** educator content, navigation, and Astro pages.

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
- [Initial setup](docs/setup.md) — local first; Azure later (do not apply unless Jeff asks)
- [Custom domain](docs/runbooks/custom-domain.md) — bind `tifftindall.com` on prod (Jeff only)
- [Testing strategy](docs/runbooks/testing-strategy.md) — post-deploy staging journeys and production smoke

## Security model

When Azure is applied, only Jeff provisions secrets. Contact email stays in `.env` / Key Vault, never in git.
