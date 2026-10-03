import { expect, test } from '@playwright/test';
import { BRAND, HERO_HEADLINE_PHRASE, PUBLIC_ROUTES } from '../helpers/content';
import { isStaticWebAppHost, waitForRequestOk } from '../helpers/propagation';

test.describe('public smoke', () => {
  test('home shows brand and hero headline', async ({ request }) => {
    const home = await waitForRequestOk(request, '/');
    const html = await home.text();
    expect(html).toContain(BRAND);
    expect(html).toContain(HERO_HEADLINE_PHRASE);
  });

  test('priority V1 routes respond', async ({ request }) => {
    for (const path of PUBLIC_ROUTES) {
      const response = await waitForRequestOk(request, path);
      expect(response.ok()).toBeTruthy();
      const body = await response.text();
      expect(body).toContain(BRAND);
    }
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

  test('contact page has mailto link', async ({ request }) => {
    const contact = await waitForRequestOk(request, '/contact');
    const html = await contact.text();
    expect(html).toMatch(/href="mailto:/);
  });

  test('API health stub responds', async ({ request }) => {
    test.skip(!isStaticWebAppHost(), 'Azure Functions exist only on deployed SWA hosts');
    const health = await waitForRequestOk(request, '/api/health');
    const body = await health.json();
    expect(body).toEqual({ ok: true });
  });
});
