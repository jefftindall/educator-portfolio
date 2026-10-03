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
  tagline: 'Dance educator',
  jobTitle: 'Dance Director & Fine Arts Department Lead',
  url: siteUrl(),
  email: requiredSiteEnv('SITE_CONTACT_EMAIL', import.meta.env.SITE_CONTACT_EMAIL),
  shortBio:
    'K–12 dance educator and school leader — Georgia standards writer, inclusive practice, and Connected Arts Network action research.',
  description:
    'Tiffany Tindall, Ed.S., dance educator at Woodland High School: standards-based inclusive dance, NDEO presenter, and Georgia dance standards writing committee (2008).',
  knowsAbout: [
    'Dance education',
    'National Core Arts Standards',
    'Inclusive education',
    'Georgia Standards of Excellence',
    'Arts leadership',
  ],
  sameAs: [] as string[],
};

export { nav } from './nav';
