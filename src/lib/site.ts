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
  tagline: 'Arts education for all.',
  jobTitle: 'Dance Teacher and Fine Arts Department Lead',
  url: siteUrl(),
  email: requiredSiteEnv('SITE_CONTACT_EMAIL', import.meta.env.SITE_CONTACT_EMAIL),
  shortBio:
    'Arts education leader and Bartow County School System High School Teacher of the Year, working to make high-quality arts education available to every student.',
  description:
    'Tiffany Tindall is an award-winning educator and fine arts leader at Woodland High School and the 2026–27 Bartow County School System High School Teacher of the Year. She helped write Georgia’s dance standards, presents nationally on inclusive dance, and works to make high-quality arts education available to every student.',
  awards: [
    'Woodland High School Teacher of the Year (2026)',
    'Bartow County School System High School Teacher of the Year (2026–27)',
    'Barber Middle School Teacher of the Year (2007–08)',
  ],
  knowsAbout: [
    'Dance education',
    'National Core Arts Standards',
    'Inclusive education',
    'Georgia Standards of Excellence',
    'Arts leadership',
  ],
  linkedin: 'https://www.linkedin.com/in/tiffany-tindall',
  sameAs: ['https://www.linkedin.com/in/tiffany-tindall'],
};

export { nav } from './nav';
