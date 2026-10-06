import { expect, test } from '@playwright/test';
import { BRAND, HERO_HEADLINE_PHRASE, MOVED_ROUTES, PUBLIC_ROUTES } from '../helpers/content';
import { isStaticWebAppHost, waitForRequestOk } from '../helpers/propagation';
import { clappingDancePoster, clappingDanceVideo, presentationPdf } from '../../src/lib/content/inclusive';

test.describe('public smoke', () => {
  test('home shows brand and hero headline', async ({ request }) => {
    const home = await waitForRequestOk(request, '/');
    const html = await home.text();
    expect(html).toContain(BRAND);
    expect(html).toContain(HERO_HEADLINE_PHRASE);
  });

  test('public routes respond', async ({ request }) => {
    for (const path of PUBLIC_ROUTES) {
      const response = await waitForRequestOk(request, path);
      expect(response.ok()).toBeTruthy();
      const body = await response.text();
      expect(body).toContain(BRAND);
    }
  });

  test('page videos and posters are served', async ({ request }) => {
    const mediaPaths = new Set<string>();
    for (const path of PUBLIC_ROUTES) {
      const html = await (await waitForRequestOk(request, path)).text();
      for (const match of html.matchAll(/(?:src|poster)="(\/media\/[^"]+)"/g)) {
        mediaPaths.add(match[1]);
      }
    }
    expect(mediaPaths.size).toBeGreaterThan(0);
    for (const mediaPath of mediaPaths) {
      const response = await request.head(mediaPath);
      expect(response.ok(), `${mediaPath} should be served`).toBeTruthy();
    }
  });

  test('Dance for Every Body shows the clapping dance video', async ({ request }) => {
    const html = await (await waitForRequestOk(request, '/leadership-and-impact/dance-for-every-body')).text();
    expect(html).toContain(`src="${clappingDanceVideo}"`);
    expect(html).toContain(`poster="${clappingDancePoster}"`);
  });

  test('moved V1 URLs redirect permanently', async ({ request }) => {
    test.skip(!isStaticWebAppHost(), 'Redirects come from staticwebapp.config.json on deployed SWA hosts');
    for (const [from, to] of Object.entries(MOVED_ROUTES)) {
      for (const path of [from, `${from}/`]) {
        const response = await waitForRequestOk(request, path, { maxRedirects: 0 });
        expect(response.status(), `${path} should 301`).toBe(301);
        const location = new URL(response.headers()['location'] ?? '', 'https://placeholder.invalid');
        expect(location.pathname.replace(/\/$/, ''), `${path} target`).toBe(to);
      }
    }
  });

  test('NDEO presentation PDF is linked and served', async ({ request }) => {
    for (const path of ['/leadership-and-impact/dance-for-every-body', '/speaking-and-workshops']) {
      const html = await (await waitForRequestOk(request, path)).text();
      expect(html, `${path} links the slides`).toContain(`href="${presentationPdf}"`);
    }
    const pdf = await request.head(presentationPdf);
    expect(pdf.ok()).toBeTruthy();
    expect(pdf.headers()['content-type'] ?? '').toMatch(/pdf/i);
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
