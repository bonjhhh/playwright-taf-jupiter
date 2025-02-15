import { Page, Locator, expect } from '@playwright/test';

export class ShopPage {
  readonly page: Page;
  readonly stuffedFrogAddButton: Locator;
  readonly fluffyBunnyAddButton: Locator;
  readonly valentineBearAddButton: Locator;
  readonly cartLink: Locator;
  readonly cartCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.stuffedFrogAddButton = page.locator('li:has-text("Stuffed Frog") .btn.btn-success:has-text("Buy")');
    this.fluffyBunnyAddButton = page.locator('li:has-text("Fluffy Bunny") .btn.btn-success:has-text("Buy")');
    this.valentineBearAddButton = page.locator('li:has-text("Valentine Bear") .btn.btn-success:has-text("Buy")');
    this.cartLink = page.locator('a[href$="cart"]');
    this.cartCount = page.locator('a[href="#/cart"] .cart-count');
  }

  async navigate() {
    await this.page.goto('/#/shop');
  }

  async validateCartCount(expectedCount: number) {
    await expect(this.cartCount).toHaveText(expectedCount.toString());
  }

  async addStuffedFrog(quantity: number) {
    for (let i = 0; i < quantity; i++) {
      await this.stuffedFrogAddButton.click();
    }
  }

  async addFluffyBunny(quantity: number) {
    for (let i = 0; i < quantity; i++) {
      await this.fluffyBunnyAddButton.click();
    }
  }

  async addValentineBear(quantity: number) {
    for (let i = 0; i < quantity; i++) {
      await this.valentineBearAddButton.click();
    }
  }

  async goToCartPage() {
    await this.cartLink.click();
  }
}