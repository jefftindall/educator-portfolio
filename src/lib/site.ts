function requiredSiteEnv(name: 'SITE_CONTACT_EMAIL', fromMeta: string | undefined): string {
  const value = String(process.env[name] ?? fromMeta ?? '').trim();
  if (!value) {
    throw new Error(
      `${name} must be set (local .env). Copy .env.example to .env and add a contact email. Never commit the real value.`,
    );
  }
  return value;
}

function siteUrl(): string {
  const raw = String(process.env.SITE_URL ?? import.meta.env.SITE_URL ?? 'http://localhost:4321').trim();
  return (raw || 'http://localhost:4321').replace(/\/$/, '');
}

export const site = {
  name: 'Tiffany Tindall',
  tagline: 'Educator portfolio',
  jobTitle: 'Educator',
  url: siteUrl(),
  email: requiredSiteEnv('SITE_CONTACT_EMAIL', import.meta.env.SITE_CONTACT_EMAIL),
  shortBio: 'Tiffany Tindall’s educator portfolio — content coming in a later phase.',
  description: 'Tiffany Tindall’s educator portfolio at tifftindall.com.',
  knowsAbout: ['Education'],
  sameAs: [] as string[],
};

export { nav } from './nav';
