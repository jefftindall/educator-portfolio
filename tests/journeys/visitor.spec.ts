import { expect, test } from '@playwright/test';
import { BRAND, HERO_HEADLINE_PHRASE } from '../helpers/content';
import { waitForRequestOk } from '../helpers/propagation';

test.describe('visitor journeys', () => {
  test('VISIT-01 landing greets visitors', async ({ request }) => {
    const home = await waitForRequestOk(request, '/');
    const html = await home.text();
    expect(html).toContain(BRAND);
    expect(html).toContain(HERO_HEADLINE_PHRASE);
  });

  test('VISIT-02 visitor can reach teaching philosophy from home', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /read my teaching philosophy/i }).click();
    await expect(page).toHaveURL(/teaching-philosophy/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/teaching philosophy/i);
  });
});
