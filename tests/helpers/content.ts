import { nav } from '../../src/lib/nav';

export const BRAND = 'Tiffany Tindall';

/** Core phrase from the home pull quote (apostrophe may be HTML-escaped in responses). */
export const HERO_HEADLINE_PHRASE = 'change the standard. Change the instructional method.';

export const PUBLIC_ROUTES = ['/', ...nav.map((item) => item.href)];
