import { expect, test } from '@playwright/test';
import { waitForRequestOk } from '../helpers/propagation';

test.describe('visitor journeys', () => {
  test('VISIT-01 landing greets visitors', async ({ request }) => {
    const home = await waitForRequestOk(request, '/');
    expect((await home.text()).trim()).toBe('hello world');
  });
});
