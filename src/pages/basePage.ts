import { Page, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyCartPageDisplayed() {
    await expect(this.page).toHaveURL(/.*\/cart/);
  }
}