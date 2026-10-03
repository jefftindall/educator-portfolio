import { expect, test } from '@playwright/test';
import { BRAND, PUBLIC_ROUTES } from '../helpers/content';
import { waitForRequestOk } from '../helpers/propagation';

test.describe('J-SEO-01 technical SEO', () => {
  test('sitemap lists public routes', async ({ request }) => {
    const index = await waitForRequestOk(request, '/sitemap-index.xml');
    const indexXml = await index.text();
    expect(indexXml).toMatch(/sitemap/i);

    const childMatch = indexXml.match(/<loc>([^<]+sitemap-0\.xml)<\/loc>/i);
    expect(childMatch).toBeTruthy();
    const childPath = childMatch![1].replace(/^https?:\/\/[^/]+/, '');
    const child = await waitForRequestOk(request, childPath);
    const childXml = await child.text();
    for (const path of PUBLIC_ROUTES) {
      const segment = path === '/' ? '/' : `${path}/`;
      expect(childXml).toMatch(new RegExp(segment.replace(/\//g, '\\/') + '</loc>'));
    }
  });

  test('home has title and meta description', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(new RegExp(BRAND, 'i'));
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description?.length).toBeGreaterThan(20);
  });
});
