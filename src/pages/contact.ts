import { Page, Locator } from '@playwright/test';

export class ContactPage {
  readonly page: Page;
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
    this.page = page;
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
}