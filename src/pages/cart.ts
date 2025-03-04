import { expect, Locator, Page } from '@playwright/test';
import { removeTrailingZeros } from '../utils/stringUtils';
import { BasePage } from './basePage';

export class CartPage extends BasePage {
  readonly cartLink: Locator;
  readonly stuffedFrogRow: Locator;
  readonly fluffyBunnyRow: Locator;
  readonly valentineBearRow: Locator;
  

  constructor(page: Page) {
    super(page);
    this.cartLink = page.getByRole('link', { name: /Cart \(\d+\)/ });
    this.stuffedFrogRow = page.getByRole('row', { name: 'Stuffed Frog $10.99 2 $' });
    this.fluffyBunnyRow = page.getByRole('row', { name: 'Fluffy Bunny $9.99 6 $' });
    this.valentineBearRow = page.getByRole('row', { name: 'Valentine Bear $14.99 3 $' });
    
  }  

  async goToCart() {
    await this.cartLink.click();
  } 

  // Initially - I thought of validating the cart details based on hard-coded values (e.g. based on expectedPrice, expectedQuantity, expectedSubtotal)
  // But I realized that it would be better to validate the cart details based on the actual values in the cart.
  // This is because the cart details are dynamic and can change based on the user's actions.
  async validateCartItem(toy: string, expectedPrice: string, expectedQuantity: number, expectedSubtotal: string) {
    const row = this.page.locator(`tr:has-text("${toy}")`);
    const price = row.locator('td').nth(1);
    const quantity = row.locator('input[type="number"]');
    const subtotal = row.locator('td').nth(3);

    await expect(price).toHaveText(expectedPrice);
    await expect(quantity).toHaveValue(expectedQuantity.toString());
    await expect(subtotal).toHaveText(expectedSubtotal);
  }

  // I created a separate method for validating the cart item subtotal because it is a common validation that can be reused in other test cases.
  // This method validates the subtotal of a cart item based on the toy name and expected quantity.
  // The method calculates the subtotal based on the price and quantity of the toy and compares it with the actual subtotal in the cart.
  async validateCartItemSubTotal(toy: string, expectedQuantity: number) {
    const row = this.page.locator(`tr:has-text("${toy}")`);
    const priceText = await row.locator('td').nth(1).textContent();
    const quantityText = await row.locator('input[type="number"]').inputValue();
    const subtotal = row.locator('td').nth(3);

    const price = parseFloat(priceText?.replace('$', '') || '0');
    const quantity = parseInt(quantityText, 10);
    const calculatedSubtotal = (price * quantity).toFixed(2);

    console.log(`Toy: ${toy}`);
    console.log(`Price: $${price.toFixed(2)}`);
    console.log(`Expected Quantity: ${expectedQuantity}`);
    console.log(`Actual Quantity: ${quantity}`);
    console.log(`Calculated Subtotal: $${calculatedSubtotal}`);
    console.log(`Actual Subtotal: ${await subtotal.textContent()}`);

    await expect(subtotal).toHaveText(`$${calculatedSubtotal}`);
  }

  async validateCartItemPrice(toy: string, expectedPrice: number) {
    const row = this.page.locator(`tr:has-text("${toy}")`);
    const price = row.locator('td').nth(1);

    await expect(price).toHaveText(`$${expectedPrice.toFixed(2)}`);
  }

  // I created a separate method for validating the cart total because it is a common validation that can be reused in other test cases.
  // This method calculates the total based on the subtotals of the cart items and compares it with the actual total in the cart.
  // 
 async validateCartTotal() {
    const subtotals = await this.page.locator('tr td:nth-child(4)').allTextContents();
    const calculatedTotal = subtotals.reduce((sum, subtotal) => sum + parseFloat(subtotal.replace('$', '')), 0).toFixed(2);
    const totalText = await this.page.locator('tfoot .total').textContent();
    
    // Extract the actual total from the totalText is a little bit tricky value is undefined
    // and will revisit this later and will use totalText with string 'Total: ' when comparing on calculated value
    const actualTotal = totalText?.replace('Total: $', '').trim();

    // Ensuring CalculatedTotal total is formatted to two decimal places    
    const formattedCalculatedTotal = removeTrailingZeros(parseFloat(calculatedTotal).toFixed(2));
    
    console.log(`Formatted Calculated Total: $${formattedCalculatedTotal}`);    
    console.log(`totalText: ${totalText}`);
    console.log(`actualTotal: ${actualTotal}`);

    expect(totalText).toBe(`Total: ${formattedCalculatedTotal}`);

  }

  async validateActualTotalVsExpectedTotal(expectedTotal: string) {
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