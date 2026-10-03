import { expect, test } from '@playwright/test';
import { isStaticWebAppHost, waitForRequestOk } from '../helpers/propagation';

test.describe('public smoke', () => {
  test('home is plain text hello world', async ({ request }) => {
    const home = await waitForRequestOk(request, '/');
    expect((await home.text()).trim()).toBe('hello world');
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
