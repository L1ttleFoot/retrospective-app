import { expect, test as setup } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');

  await page.fill('#login', process.env.TEST_USER_LOGIN!);
  await page.fill('#password', process.env.TEST_USER_PASSWORD!);

  const loginResponse = page.waitForResponse(response => 
    response.url().includes('/api/auth') && response.status() === 200
  );

  await page.click('button');
  await loginResponse;

  await page.waitForURL('**/'); 

  const logoutButton = page.getByLabel('logout-button');

  expect(logoutButton).toBeVisible();

  await page.context().storageState({ path: 'auth.json' });
});
