import { test as setup } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');

  await page.fill('#login', process.env.TEST_USER_LOGIN!);
  await page.fill('#password', process.env.TEST_USER_PASSWORD!);

  await page.click('button');

  await page.context().storageState({ path: 'auth.json' });
});
