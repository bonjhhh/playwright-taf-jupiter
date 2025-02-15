import { test, expect } from '../fixtures/jupiter-test';
import { CartPage } from '../pages/cart';

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

    const cartPage = new CartPage(shopPage.page);

    await test.step('Step 5: Validate the count of toys in the cart', async () => {
      await cartPage.validateCartCount(10);
    });

    await test.step('Step 6: Navigate to the cart page', async () => {
      await shopPage.goToCartPage();
    });

    await test.step('Step 7: Verify that the cart page is displayed', async () => {
      await expect(shopPage.page).toHaveURL(/.*\/cart/);
    });

    await test.step('Step 8: Validate the amounts of each item in the cart', async () => {
      await cartPage.validateCartItem('Stuffed Frog', '$10.99', 2, '$21.98');
      await cartPage.validateCartItem('Fluffy Bunny', '$9.99', 5, '$49.95');
      await cartPage.validateCartItem('Valentine Bear', '$14.99', 3, '$44.97');
    });

    await test.step('Step 9: Verify the total amount in the cart', async () => {
      await cartPage.validateTotal('116.9');
    });

    // Put branch in the report
    // Store in test input data file unit price as part of test? or configuration?
    // Then calculate unit price x expected quantity 
  });
});