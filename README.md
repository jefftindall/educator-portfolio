# Tiffany Tindall

Personal brand site for **Tiffany Tindall** — educator portfolio (foundational phase). Built with Astro so Tiffany can edit pages in Cursor. Azure Static Web Apps hosts staging and prod; the public hostname is [`tiffanytindall.com`](docs/runbooks/custom-domain.md).

This repo follows the same platform pattern as the other Tindall portfolio sites (Astro + Azure Static Web Apps + Terraform). **This milestone is repo plumbing only** — the live site is a single hello-world page until the content phase.

## Quick start

You need [Node.js](https://nodejs.org/) 22 or newer.

```bash
copy .env.example .env
# Put a contact email in SITE_CONTACT_EMAIL (never commit .env)

npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321). You should see plain text: `Hello World`.

### Lint

```bash
npm run lint
```

Run this before every commit. It checks Terraform, the Astro site, the API stub, and GitHub Actions secret-safety.

## Content phase (later)

Permanent pages, markdown collections, styling, and brand content will land in a follow-up phase. For now, only `src/pages/index.astro` is published.

**Work on a branch.** Open a pull request; Jeff reviews and merges `main`. CI is the PR gate. Direct pushes to `main` are blocked.

## Documentation

- [AGENTS.md](AGENTS.md) — rules for Cursor (privacy, brand, lint)
- [Initial setup](docs/setup.md) — local first; Azure later (do not apply unless Jeff asks)
- [Custom domain](docs/runbooks/custom-domain.md) — bind `tiffanytindall.com` on prod (Jeff only)
- [Brand & UI style guide](docs/style-guide.md) — placeholder for the content phase
- [Testing strategy](docs/runbooks/testing-strategy.md) — post-deploy staging journeys and production smoke

## Security model (later)

When Azure is applied, only Jeff provisions secrets. Tiffany does not deploy. Contact email stays in `.env` / Key Vault, never in git.
