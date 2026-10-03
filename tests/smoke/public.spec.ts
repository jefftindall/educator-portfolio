import { expect, test } from '@playwright/test';
import { BRAND } from '../helpers/content';
import { isStaticWebAppHost, waitForOk, waitForRequestOk } from '../helpers/propagation';

test.describe('public smoke', () => {
  test('home shows brand and hello world', async ({ page }) => {
    await waitForOk(page, '/');
    await expect(page.getByRole('heading', { name: BRAND, level: 1 })).toBeVisible();
    await expect(page.getByText('Hello, world.')).toBeVisible();
  });

  test('robots.txt and sitemap are served', async ({ request }) => {
    const robots = await waitForRequestOk(request, '/robots.txt');
    const robotsText = await robots.text();
    expect(robotsText).toMatch(/Allow:\s*\//i);

    const sitemap = await waitForRequestOk(request, '/sitemap-index.xml');
    expect(sitemap.headers()['content-type'] ?? '').toMatch(/xml/i);
    const sitemapText = await sitemap.text();
    expect(sitemapText).toMatch(/sitemap/i);
  });

  test('API health stub responds', async ({ request }) => {
    test.skip(!isStaticWebAppHost(), 'Azure Functions exist only on deployed SWA hosts');
    const health = await waitForRequestOk(request, '/api/health');
    const body = await health.json();
    expect(body).toEqual({ ok: true });
  });
});
