import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://jupiter.cloud.planittesting.com/#/');
  await page.getByRole('link', { name: 'Shop', exact: true }).click();
  await page.locator('#product-2').getByRole('img').click();
  await page.locator('#product-2').getByRole('link', { name: 'Buy' }).click();
  await page.locator('#product-4').getByRole('link', { name: 'Buy' }).click();
  await page.locator('#product-7').getByRole('link', { name: 'Buy' }).click();
  await expect(page.locator('#nav-cart')).toMatchAriaSnapshot(`- link "Cart (3)"`);
  await page.getByRole('link', { name: 'Cart (3)' }).click();
  await expect(page.locator('tbody')).toMatchAriaSnapshot(`- cell /\\$\\d+\\.\\d+/`);
  await expect(page.locator('tbody')).toMatchAriaSnapshot(`- cell /\\$\\d+\\.\\d+/`);
  await expect(page.locator('tbody')).toMatchAriaSnapshot(`- cell /\\$\\d+\\.\\d+/`);
  await page.getByRole('row', { name: 'Stuffed Frog $10.99 1 $' }).getByRole('spinbutton').click();
  await page.getByRole('row', { name: 'Stuffed Frog $10.99 1 $' }).getByRole('spinbutton').fill('2');
  await page.getByRole('row', { name: 'Fluffy Bunny $9.99 1 $' }).getByRole('spinbutton').click();
  await page.getByRole('row', { name: 'Fluffy Bunny $9.99 1 $' }).getByRole('spinbutton').fill('5');
  await page.getByRole('row', { name: 'Valentine Bear $14.99 1 $' }).getByRole('spinbutton').click();
  await page.getByRole('row', { name: 'Valentine Bear $14.99 1 $' }).getByRole('spinbutton').fill('3');
  await expect(page.locator('tbody')).toMatchAriaSnapshot(`- cell /\\$\\d+\\.\\d+/`);
  await page.getByRole('cell', { name: '$49.95' }).click();
  await expect(page.locator('tbody')).toMatchAriaSnapshot(`- cell /\\$\\d+\\.\\d+/`);
  await expect(page.locator('tbody')).toMatchAriaSnapshot(`- cell /\\$\\d+\\.\\d+/`);
  await expect(page.locator('tbody')).toMatchAriaSnapshot(`- cell /\\$\\d+\\.\\d+/`);await expect(page.locator('tbody')).toMatchAriaSnapshot(`- cell /\\$\\d+\\.\\d+/`);
});
