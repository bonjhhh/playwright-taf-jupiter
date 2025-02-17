import { Page, Locator, expect } from '@playwright/test';
import { ToyName } from '../models/testCase';
import { BasePage } from './basePage';

export class ShopPage extends BasePage {
  readonly cartLink: Locator;
  readonly cartCount: Locator;

  constructor(page: Page) {
    super(page);
    this.cartLink = page.locator('a[href$="cart"]');
    this.cartCount = page.locator('a[href="#/cart"] .cart-count');
  }

  async navigate() {
    await this.page.goto('/#/shop');
  }

  async validateCartCount(expectedCount: number) {
    await expect(this.cartCount).toHaveText(expectedCount.toString());
  }

  async addToyToCart(toyName: ToyName, quantity: number) {
    const addButton = this.page.locator(`li:has-text("${toyName}") .btn.btn-success:has-text("Buy")`);
    for (let i = 0; i < quantity; i++) {
      await addButton.click();
    }
  }

  async goToCartPage() {
    await this.cartLink.click();
  }
}