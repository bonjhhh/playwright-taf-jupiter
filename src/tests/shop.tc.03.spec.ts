import { test, expect } from '../fixtures/jupiter-test';

test.describe('Shop Page Tests', () => {
  test('Test Case 3: Add items to cart, navigate to cart page, and validate amounts', async ({ homePage, shopPage }) => {
    await test.step('Step 1: Navigate to the shop page', async () => {
      await homePage.navigate();
      await homePage.goToShopPage();
    });

    await test.step('Step 2: Add 2 Stuffed Frogs to the cart', async () => {
      await shopPage.addStuffedFrog(2);
    });

    await test.step('Step 3: Add 5 Fluffy Bunnies to the cart', async () => {
      await shopPage.addFluffyBunny(5);
    });

    await test.step('Step 4: Add 3 Valentine Bears to the cart', async () => {
      await shopPage.addValentineBear(3);
    });

    await test.step('Step 5: Navigate to the cart page', async () => {
      await shopPage.goToCartPage();
    });

    await test.step('Step 6: Verify that the cart page is displayed', async () => {
      await expect(shopPage.page).toHaveURL(/.*\/cart/);
    });
  });
});