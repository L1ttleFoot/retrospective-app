import { test, expect } from '@playwright/test';

test('message actions', async ({  browser }) => {

  const adminContext = await browser.newContext();
  const adminPage = await adminContext.newPage();

 const guestContext = await browser.newContext({ storageState: { cookies: [], origins: [] } });
 const guestPage = await guestContext.newPage();

  await adminPage.goto('/?id=cmmaik6tx000004l4j2k6fw7p');

  await expect(adminPage).toHaveTitle(/Retrospective App/);

  await expect(adminPage.getByText('52')).toBeVisible();

  await adminPage.getByRole('button', { name: 'add' }).first().click();

  const textarea = adminPage.getByRole('textbox',{ name: 'add message text-area' });

  await textarea.fill('Мое новое сообщение');

  await textarea.press('Enter');

  const message = adminPage.getByText('Мое новое сообщение')

  await expect(message).toBeVisible();

  await guestPage.goto('/?id=cmmaik6tx000004l4j2k6fw7p');

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

