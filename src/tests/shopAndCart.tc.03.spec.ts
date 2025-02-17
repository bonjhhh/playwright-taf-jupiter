import { test, expect } from '../fixtures/jupiter-test';
import { testCase } from '../data/shop/tc03-test-data';

test.describe('Shop Page Tests', () => {
  test(testCase.testName!, async ({ homePage, shopPage, cartPage }) => {
    await test.step('Step 1: Navigate to the shop page', async () => {
      await homePage.navigate();
      await homePage.goToShopPage();
    });

    await test.step('Step 2: Add toys to the cart', async () => {
      for (const order of testCase.toyOrders || []) {
        await test.step(`Add ${order.quantity} ${order.toyName}(s) to the cart`, async () => {
          await shopPage.addToyToCart(order.toyName, order.quantity);
        });
      }
    });

    await test.step('Step 3: Validate the count of toys in the cart', async () => {
      await shopPage.validateCartCount(testCase.cartCount || 0);
    });

    await test.step('Step 4: Navigate to the cart page', async () => {
      await shopPage.goToCartPage();
    });

    await test.step('Step 5: Verify that the cart page is displayed', async () => {
      await shopPage.verifyCartPageDisplayed();
    });

    await test.step('Step 6: Validate the subtotal for each item in the cart', async () => {
      for (const order of testCase.toyOrders || []) {
        await cartPage.validateCartItemSubTotal(order.toyName, order.quantity);
      }
    });

    await test.step('Step 7: Verify the total amount in the cart', async () => {
      await cartPage.validateCartTotal();
    });
  });
});