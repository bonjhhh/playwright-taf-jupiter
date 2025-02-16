import { ShopAndCartTestCase } from '../../models/testCase';

export const testCase: ShopAndCartTestCase = {
  testId: "TC03",
  testName: "Verify adding items to cart and validating cart count",
  description: "This test case verifies that items can be added to the cart and the cart count is updated correctly.",
  toyOrders: [
    {
      toyName: "Stuffed Frog",
      quantity: 2
    },
    {
      toyName: "Fluffy Bunny",
      quantity: 5
    },
    {
      toyName: "Valentine Bear",
      quantity: 3
    }
  ],
  cartCount: 10
};