import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://jupiter.cloud.planittesting.com/#/');
  await page.getByRole('link', { name: 'Shop', exact: true }).click();
  await page.locator('#product-2').getByRole('link', { name: 'Buy' }).click();
  await page.locator('#product-2').getByRole('link', { name: 'Buy' }).click();
  await page.locator('#product-4').getByRole('link', { name: 'Buy' }).click();
  await page.locator('#product-4').getByRole('link', { name: 'Buy' }).click();
  await page.locator('#product-4').getByRole('link', { name: 'Buy' }).click();
  await page.locator('#product-4').getByRole('link', { name: 'Buy' }).click();
  await page.locator('#product-4').getByRole('link', { name: 'Buy' }).click();
  await page.locator('#product-4').getByRole('link', { name: 'Buy' }).click();
  await page.locator('#product-7').getByRole('link', { name: 'Buy' }).click();
  await page.locator('#product-7').getByRole('link', { name: 'Buy' }).click();
  await page.locator('#product-7').getByRole('link', { name: 'Buy' }).click();
  await expect(page.locator('#nav-cart')).toMatchAriaSnapshot(`- link /Cart \\(\\d+\\)/`);
  await expect(page.getByRole('link', { name: 'Cart (11)' })).toBeVisible();
  await page.getByRole('link', { name: 'Cart (11)' }).click();
  await page.getByRole('cell', { name: 'Stuffed Frog' }).click();
  await expect(page.locator('tbody')).toMatchAriaSnapshot(`
    - cell "Stuffed Frog":
      - img
    `);
  await expect(page.locator('tbody')).toMatchAriaSnapshot(`- cell /\\$\\d+\\.\\d+/`);
  await page.getByRole('row', { name: 'Stuffed Frog $10.99 2 $' }).getByRole('spinbutton').click();
  await expect(page.locator('tbody')).toMatchAriaSnapshot(`- cell /\\$\\d+\\.\\d+/`);
  await expect(page.locator('tbody')).toMatchAriaSnapshot(`
    - cell "Fluffy Bunny":
      - img
    `);
  await expect(page.locator('tbody')).toMatchAriaSnapshot(`- cell /\\$\\d+\\.\\d+/`);
  await page.getByRole('row', { name: 'Fluffy Bunny $9.99 6 $' }).getByRole('spinbutton').click();
  await expect(page.locator('tbody')).toMatchAriaSnapshot(`- cell /\\$\\d+\\.\\d+/`);
  await expect(page.locator('tbody')).toMatchAriaSnapshot(`
    - cell "Valentine Bear":
      - img
    `);
  await expect(page.locator('tbody')).toMatchAriaSnapshot(`- cell /\\$\\d+\\.\\d+/`);
  await page.getByRole('cell', { name: '3' }).getByRole('spinbutton').click();
  await expect(page.locator('tbody')).toMatchAriaSnapshot(`- cell /\\$\\d+\\.\\d+/`);
});