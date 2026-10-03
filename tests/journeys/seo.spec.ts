import { expect, test } from '@playwright/test';
import { waitForOk } from '../helpers/propagation';

test.describe('J-SEO-01 technical SEO', () => {
  test('home loads for future SEO checks', async ({ page }) => {
    await waitForOk(page, '/');
    await expect(page.locator('body')).toContainText('Hello World');
    // Title, canonical, and meta tags arrive with the content phase layout.
  });
});
