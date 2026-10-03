import { expect, test } from '@playwright/test';
import { waitForOk } from '../helpers/propagation';

test.describe('visitor journeys', () => {
  test('VISIT-01 home loads', { tag: '@content' }, async ({ page }) => {
    await waitForOk(page, '/');
    await expect(page.locator('body')).toContainText('Hello World');
  });
});
