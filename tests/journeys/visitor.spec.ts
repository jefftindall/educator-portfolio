import { expect, test } from '@playwright/test';
import { BRAND } from '../helpers/content';
import { waitForOk } from '../helpers/propagation';

test.describe('visitor journeys', () => {
  test('VISIT-01 landing greets visitors', async ({ page }) => {
    await waitForOk(page, '/');
    await expect(page.getByRole('heading', { name: BRAND, level: 1 })).toBeVisible();
    await expect(page.getByText('Hello, world.')).toBeVisible();
  });
});
