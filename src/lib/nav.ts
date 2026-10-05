export type NavItem = { href: string; label: string };

export const nav: readonly NavItem[] = [
  { href: '/about', label: 'About' },
  { href: '/leadership-and-impact', label: 'Leadership' },
  { href: '/speaking-and-workshops', label: 'Speaking' },
  { href: '/experience', label: 'Experience' },
  { href: '/contact', label: 'Contact' },
];

/** Public pages that live under a nav section rather than in the nav itself. */
export const subpages: readonly NavItem[] = [
  { href: '/leadership-and-impact/dance-for-every-body', label: 'Dance for Every Body' },
];
