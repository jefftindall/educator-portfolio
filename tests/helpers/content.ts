import { nav, subpages } from '../../src/lib/nav';

export const BRAND = 'Tiffany Tindall';

/** Core phrase from the home pull quote (apostrophe may be HTML-escaped in responses). */
export const HERO_HEADLINE_PHRASE = 'change the standard. Change the instructional method.';

export const PUBLIC_ROUTES = ['/', ...nav.map((item) => item.href), ...subpages.map((item) => item.href)];

/** V1 URLs that moved in the V2 structure; each must 301 to its new home on SWA hosts. */
export const MOVED_ROUTES: Readonly<Record<string, string>> = {
  '/standards-and-leadership': '/leadership-and-impact',
  '/teaching-philosophy': '/about',
  '/dance-for-every-body': '/leadership-and-impact/dance-for-every-body',
};
