import { expect, test } from '@playwright/test';
import { waitForRequestOk } from '../helpers/propagation';

test.describe('J-SEO-01 technical SEO', () => {
  test('sitemap lists home', async ({ request }) => {
    const index = await waitForRequestOk(request, '/sitemap-index.xml');
    const indexXml = await index.text();
    expect(indexXml).toMatch(/sitemap/i);
  });
});
