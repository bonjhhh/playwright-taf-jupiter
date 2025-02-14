import { test as baseTest } from '@playwright/test';
import { HomePage } from '../pages/home';
import { ContactPage } from '../pages/contact';
import { ShopPage } from '../pages/shop';

type MyFixtures = {
  homePage: HomePage;
  contactPage: ContactPage;
  shopPage: ShopPage;
};

export const test = baseTest.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },
  shopPage: async ({ page }, use) => {
    await use(new ShopPage(page));
  },
});

export { expect } from '@playwright/test';