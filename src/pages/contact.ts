import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class ContactPage extends BasePage {
  readonly forenameInput: Locator;
  readonly surnameInput: Locator;
  readonly emailInput: Locator;
  readonly telephoneInput: Locator;
  readonly messageInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessages: Locator;
  readonly successMessage: Locator;
  readonly forenameError: Locator;
  readonly formError: Locator;
  readonly emailError: Locator;
  readonly messageError: Locator;

  constructor(page: Page) {
    super(page);
    this.forenameInput = page.locator('#forename');
    this.surnameInput = page.locator('#surname');
    this.emailInput = page.locator('#email');
    this.telephoneInput = page.locator('#telephone');
    this.messageInput = page.locator('#message');
    this.submitButton = page.locator('.btn-contact.btn.btn-primary:has-text("Submit")');
    this.errorMessages = page.locator('.alert-error');
    this.successMessage = page.locator('.alert-success');
    this.forenameError = page.locator('#forename-err');
    this.formError = page.locator('.alert-error.ng-scope:has-text("We welcome your feedback")');
    this.emailError = page.locator('#email-err');
    this.messageError = page.locator('#message-err');
  }

  async navigate() {
    await this.page.goto('/#/contact');
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async fillMandatoryFields(forename: string, email: string, message: string, telephone: string) {
    await this.forenameInput.fill(forename);
    await this.emailInput.fill(email);
    await this.messageInput.fill(message);
    await this.telephoneInput.fill(telephone);
  }

  async getErrorMessages() {
    return this.errorMessages.allTextContents();
  }

  async getSuccessMessage() {
    return this.successMessage.textContent();
  }

  async getForenameError() {
    return this.forenameError.textContent();
  }

  async getFormError() {
    return this.formError.textContent();
  }

  async getEmailError() {
    return this.emailError.textContent();
  }

  async getMessageError() {
    return this.messageError.textContent();
  }

  async checkAriaSnapshotSendingFeedback() {
    await expect(this.page.locator('body')).toMatchAriaSnapshot(`- heading "Sending Feedback" [level=1]`);
  }

  async validateSuccessMessage(forename: string) {
    const successMessage = await this.getSuccessMessage();
    expect(successMessage).toContain(`Thanks ${forename}, we appreciate your feedback.`);
  }

  async validateErrorsAreGone() {
    const errorMessagesAfterFilling = await this.getErrorMessages();
    expect(errorMessagesAfterFilling.length).toBe(0);
  }

  async verifyErrorMessages(expectedForenameError: string, expectedEmailError: string, expectedMessageError: string) {
    const forenameError = await this.getForenameError();
    const emailError = await this.getEmailError();
    const messageError = await this.getMessageError();
    expect(forenameError).toBe(expectedForenameError);
    expect(emailError).toBe(expectedEmailError);
    expect(messageError).toBe(expectedMessageError);
  }
}