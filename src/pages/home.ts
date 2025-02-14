import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly contactLink: Locator;
  readonly shopLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactLink = page.locator('a[href$="contact"]');
    this.shopLink = page.locator('a[href$="shop"]');
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
}