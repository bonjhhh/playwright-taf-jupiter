import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
  readonly contactLink: Locator;
  readonly shopLink: Locator;
  readonly startShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.contactLink = page.locator('a[href="#/contact"] >> text=Contact');
    this.shopLink = page.getByRole('link', { name: 'Shop', exact: true });
    this.startShoppingButton = page.getByRole('link', { name: 'Start Shopping »' });
  }

  async navigate() {
    await this.page.goto('/');
  }

  async goToContactPage() {
    await this.contactLink.click();
  }

  async goToShopPage() {
    await this.shopLink.click();
  }

  async clickStartShoppingButton() {
    await this.startShoppingButton.click();
  }
}