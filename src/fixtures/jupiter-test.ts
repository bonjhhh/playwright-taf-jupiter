import { test as baseTest } from '@playwright/test';
import { HomePage } from '../pages/home';
import { ContactPage } from '../pages/contact';
import { ShopPage } from '../pages/shop';
import { CartPage } from '../pages/cart';

type JupiterToys = {
  homePage: HomePage;
  contactPage: ContactPage;
  shopPage: ShopPage;
  cartPage: CartPage;
};

export const test = baseTest.extend<JupiterToys>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },
  shopPage: async ({ page }, use) => {
    await use(new ShopPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

export { expect } from '@playwright/test';