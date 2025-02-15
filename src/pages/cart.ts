import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly stuffedFrogRow: Locator;
  readonly fluffyBunnyRow: Locator;
  readonly valentineBearRow: Locator;
  readonly cartCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.getByRole('link', { name: /Cart \(\d+\)/ });
    this.stuffedFrogRow = page.getByRole('row', { name: 'Stuffed Frog $10.99 2 $' });
    this.fluffyBunnyRow = page.getByRole('row', { name: 'Fluffy Bunny $9.99 6 $' });
    this.valentineBearRow = page.getByRole('row', { name: 'Valentine Bear $14.99 3 $' });
    this.cartCount = page.locator('a[href="#/cart"] .cart-count');
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async validateCartCount(expectedCount: number) {
    await expect(this.cartCount).toHaveText(expectedCount.toString());
  }

  async validateCartItem(toy: string, expectedPrice: string, expectedQuantity: number, expectedSubtotal: string) {
    const row = this.page.locator(`tr:has-text("${toy}")`);
    const price = row.locator('td').nth(1);
    const quantity = row.locator('input[type="number"]');
    const subtotal = row.locator('td').nth(3);

    await expect(price).toHaveText(expectedPrice);
    await expect(quantity).toHaveValue(expectedQuantity.toString());
    await expect(subtotal).toHaveText(expectedSubtotal);
  }

  async validateTotal(expectedTotal: string) {
    const total = this.page.locator('tfoot .total');
    await expect(total).toHaveText(`Total: ${expectedTotal}`);
  }

  async clickStuffedFrogSpinButton() {
    await this.stuffedFrogRow.getByRole('spinbutton').click();
  }

  async clickFluffyBunnySpinButton() {
    await this.fluffyBunnyRow.getByRole('spinbutton').click();
  }

  async clickValentineBearSpinButton() {
    await this.valentineBearRow.getByRole('spinbutton').click();
  }
}