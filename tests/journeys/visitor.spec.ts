import { expect, test } from '@playwright/test';
import { nav } from '../../src/lib/nav';
import { BRAND, HERO_HEADLINE_PHRASE } from '../helpers/content';
import { waitForRequestOk } from '../helpers/propagation';
import { presentationPdf } from '../../src/lib/content/inclusive';

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
    await expect(page).toHaveURL(/\/about\/?#teaching-philosophy$/);
    await expect(page.getByRole('heading', { level: 2, name: /teaching philosophy/i })).toBeInViewport();
  });

  test('VISIT-03 home explore cards reach every section', async ({ page }) => {
    for (const item of nav.filter((entry) => entry.href !== '/contact')) {
      await page.goto('/');
      await page.locator(`main a[href="${item.href}"]`).first().click();
      await expect(page).toHaveURL(new RegExp(`${item.href}/?$`));
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    }
  });

  test('VISIT-04 leadership leads to Dance for Every Body and its slides', async ({ page }) => {
    await page.goto('/leadership-and-impact');
    await page.getByRole('link', { name: /read about inclusive dance/i }).click();
    await expect(page).toHaveURL(/\/leadership-and-impact\/dance-for-every-body\/?$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/dance for every body/i);
    await expect(page.getByRole('link', { name: /download the slides/i })).toHaveAttribute('href', presentationPdf);
  });

  test('VISIT-05 experience leads to contact', async ({ page }) => {
    await page.goto('/experience');
    await expect(page.getByRole('heading', { level: 2, name: /teacher of the year/i })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: /professional learning/i })).toBeVisible();
    await page.getByRole('link', { name: /get in touch/i }).click();
    await expect(page).toHaveURL(/\/contact\/?$/);
    await expect(page.locator('main a[href^="mailto:"]')).toHaveCount(1);
  });
});
