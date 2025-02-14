import { test, expect } from '../fixtures/jupiter-test';

test.describe('Shop Page Tests', () => {
  test('Test Case 3: Add items to cart and navigate to cart page', async ({ homePage, shopPage }) => {
    // Step 1: Navigate to the shop page
    await homePage.navigate();
    await homePage.goToShopPage();

    // Step 2: Add 2 Stuffed Frogs to the cart
    await shopPage.addStuffedFrog(2);

    // Step 3: Add 5 Fluffy Bunnies to the cart
    await shopPage.addFluffyBunny(5);

    // Step 4: Add 3 Valentine Bears to the cart
    await shopPage.addValentineBear(3);

    // Step 5: Navigate to the cart page
    await shopPage.goToCartPage();

    // Step 6: Verify that the cart page is displayed
    await expect(shopPage.page).toHaveURL(/.*\/cart/);
  });
});