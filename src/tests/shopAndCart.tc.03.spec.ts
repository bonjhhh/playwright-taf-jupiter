import { test, expect } from '../fixtures/jupiter-test';
import { CartPage } from '../pages/cart';
import * as testData from '../data/shop/tc03-test-data.json';

test.describe('Shop Page Tests', () => {
  test('Test Case 3: Add items to cart, navigate to cart page, and validate amounts', async ({ homePage, shopPage }) => {
    await test.step('Step 1: Navigate to the shop page', async () => {
      await homePage.navigate();
      await homePage.goToShopPage();
    });

    await test.step('Step 2: Add 2 Stuffed Frogs to the cart', async () => {
      await shopPage.addStuffedFrog(testData.stuffedFrogQuantity);
    });

    await test.step('Step 3: Add 5 Fluffy Bunnies to the cart', async () => {
      await shopPage.addFluffyBunny(testData.fluffyBunnyQuantity);
    });

    await test.step('Step 4: Add 3 Valentine Bears to the cart', async () => {
      await shopPage.addValentineBear(testData.valentineBearQuantity);
    });

    const cartPage = new CartPage(shopPage.page);

    await test.step('Step 5: Validate the count of toys in the cart', async () => {
      await shopPage.validateCartCount(testData.cartCount);
    });

    await test.step('Step 6: Navigate to the cart page', async () => {
      await shopPage.goToCartPage();
    });

    await test.step('Step 7: Verify that the cart page is displayed', async () => {
      await expect(shopPage.page).toHaveURL(/.*\/cart/);
    });

    await test.step('Step 8: Validate the subtotal for each item in the cart', async () => {
      await cartPage.validateCartItemSubTotal('Stuffed Frog', testData.stuffedFrogQuantity);
      await cartPage.validateCartItemSubTotal('Fluffy Bunny', testData.fluffyBunnyQuantity);
      await cartPage.validateCartItemSubTotal('Valentine Bear', testData.valentineBearQuantity);
    });

    await test.step('Step 9: Verify the total amount in the cart', async () => {
      await cartPage.validateCartTotal();
    });
  });
});