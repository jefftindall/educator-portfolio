import { expect, test } from '@playwright/test';
import { isStaticWebAppHost, waitForOk, waitForRequestOk } from '../helpers/propagation';

test.describe('public smoke', () => {
  test('home shows hello world', async ({ page }) => {
    await waitForOk(page, '/');
    await expect(page.locator('body')).toContainText('Hello World');
  });

  test('robots.txt and sitemap are served', async ({ request }) => {
    const robots = await waitForRequestOk(request, '/robots.txt');
    expect(await robots.text()).toMatch(/Allow:\s*\//);

    const sitemap = await waitForRequestOk(request, '/sitemap-index.xml');
    expect(sitemap.headers()['content-type'] ?? '').toMatch(/xml/i);
    expect(await sitemap.text()).toMatch(/sitemap/i);
  });

  test('API health stub responds', async ({ request }) => {
    test.skip(!isStaticWebAppHost(), 'Azure Functions exist only on deployed SWA hosts');
    const health = await waitForRequestOk(request, '/api/health');
    expect(await health.json()).toEqual({ ok: true });
  });
});
