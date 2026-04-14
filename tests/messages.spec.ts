import { test, expect } from '@playwright/test';

test.describe('message actions', () => {

  test.beforeEach(async ({ request, page }) => {

    await page.goto('/');

    const token = await page.evaluate(() => {
      const auth = JSON.parse(localStorage.getItem('auth-storage') || '{}');
      return auth.state?.userData?.token;
    });

    if (token) {
      const response = await request.delete('http://localhost:8080/api/messages/test/cleanup', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      expect(response.ok()).toBeTruthy();
    }
  });

  test('message actions', async ({ browser }) => {

    const adminContext = await browser.newContext();
    const adminPage = await adminContext.newPage();

    const guestContext = await browser.newContext({ storageState: { cookies: [], origins: [] } });
    const guestPage = await guestContext.newPage();

    await adminPage.goto('/?id=cmnz3t18p0000r8tton9gc407');

    await expect(adminPage).toHaveTitle(/Retrospective App/);

    await expect(adminPage.getByText('52')).toBeVisible();

    await adminPage.getByRole('button', { name: 'add-message' }).first().click();

    const textarea = adminPage.getByRole('textbox', { name: 'add message text-area' });

    await textarea.fill('Мое новое сообщение');

    await textarea.press('Enter');

    const message = adminPage.getByText('Мое новое сообщение')

    await expect(message).toBeVisible();

    await guestPage.goto('/?id=cmnz3t18p0000r8tton9gc407');

    const guestMessage = guestPage.getByText('Мое новое сообщение')

    await expect(guestMessage).toBeVisible();

    const messageItem = adminPage.getByLabel('message-item').filter({ hasText: 'Мое новое сообщение' });

    const actionsArea = messageItem.getByLabel('actions area');

    await expect(actionsArea).toBeVisible()

    await actionsArea.hover();

    const deleteButton = actionsArea.getByLabel('delete message');

    await expect(deleteButton).toBeVisible();

    await deleteButton.click();

    await expect(message).not.toBeVisible();

    await expect(guestMessage).not.toBeVisible();
  });
})

