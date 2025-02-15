import { test, expect } from '../fixtures/jupiter-test';

test.describe('Contact Page Tests', () => {
  test('Test Case 1: Verify error messages and populate mandatory fields', async ({ homePage, contactPage }) => {
    await test.step('Step 1: From the home page go to contact page', async () => {
      await homePage.navigate();
      await homePage.goToContactPage();
    });

    await test.step('Step 2: Click submit button', async () => {
      await contactPage.submitForm();
    });

    await test.step('Step 3: Verify error messages', async () => {
      const forenameError = await contactPage.getForenameError();
      const emailError = await contactPage.getEmailError();
      const messageError = await contactPage.getMessageError();
      expect(forenameError).toBe('Forename is required');
      expect(emailError).toBe('Email is required');
      expect(messageError).toBe('Message is required');
    });

    await test.step('Step 4: Populate mandatory fields', async () => {
      await contactPage.fillMandatoryFields('John', 'john@example.com', 'This is a test message', '1234567890');
    });

    await test.step('Step 5: Validate errors are gone', async () => {
      const errorMessagesAfterFilling = await contactPage.getErrorMessages();
      expect(errorMessagesAfterFilling.length).toBe(0);
    });
  });
});