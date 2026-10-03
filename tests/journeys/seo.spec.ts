import { expect, test } from '@playwright/test';
import { BRAND } from '../helpers/content';
import { waitForOk, waitForRequestOk } from '../helpers/propagation';

test.describe('J-SEO-01 technical SEO', () => {
  test('head tags on home', async ({ page }) => {
    await waitForOk(page, '/');

    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    expect(title).toMatch(new RegExp(BRAND));

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveCount(1);
    const href = await canonical.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href!).toMatch(/^https?:\/\//);

    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
  });

  test('sitemap lists home only', async ({ request }) => {
    const index = await waitForRequestOk(request, '/sitemap-index.xml');
    const indexXml = await index.text();
    expect(indexXml).toMatch(/sitemap/i);
  });
});
