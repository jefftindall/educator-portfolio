export type NavItem = { href: string; label: string };
export type NavSection = NavItem & { children?: readonly NavItem[] };

export const nav: readonly NavSection[] = [
  { href: '/about', label: 'About' },
  {
    href: '/leadership-and-impact',
    label: 'Leadership',
    children: [{ href: '/leadership-and-impact/ai-in-the-arts', label: 'AI in the Arts Classroom' }],
  },
  {
    href: '/speaking-and-workshops',
    label: 'Speaking',
    children: [{ href: '/speaking-and-workshops/dance-for-every-body', label: 'Dance for Every Body' }],
  },
  { href: '/experience', label: 'Experience' },
  { href: '/contact', label: 'Contact' },
];

/** Public pages that live under a nav section rather than at the top level. */
export const subpages: readonly NavItem[] = nav.flatMap((item) => item.children ?? []);
