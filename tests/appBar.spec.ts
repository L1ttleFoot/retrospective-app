import { test, expect } from '@playwright/test';

test.describe('app bar', () => {
  test('app bar screenshot', async ({ page }) => {
    await page.goto('/');
    const appBar = page.getByLabel('app-bar')
    await expect(appBar).toHaveScreenshot('app-bar.png');
  })
})

