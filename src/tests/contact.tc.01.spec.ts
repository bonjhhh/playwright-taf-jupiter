import { test, expect } from '../fixtures/jupiter-test';
import { exec } from 'child_process';
import * as util from 'util';

const execPromise = util.promisify(exec);

test.describe('Contact Page Tests', () => {
  test('Test Case 1: Verify error messages and populate mandatory fields', async ({ homePage, contactPage }) => {
    // Step 1: From the home page go to contact page
    await homePage.navigate();
    await homePage.goToContactPage();

    // Step 2: Click submit button
    await contactPage.submitForm();

    // Step 3: Verify error messages
    const forenameError = await contactPage.getForenameError();
    const emailError = await contactPage.getEmailError();
    const messageError = await contactPage.getMessageError();
    expect(forenameError).toBe('Forename is required');
    expect(emailError).toBe('Email is required');
    expect(messageError).toBe('Message is required');

    // Step 4: Populate mandatory fields
    await contactPage.fillMandatoryFields('John', 'john@example.com', 'This is a test message', '1234567890');

    // Step 5: Validate errors are gone
    const errorMessagesAfterFilling = await contactPage.getErrorMessages();
    expect(errorMessagesAfterFilling.length).toBe(0);
  });

  test.afterEach(async () => {
    // Send Slack notification
    try {
      await execPromise('node src/utils/notifySlack.js');
      console.log('Slack notification sent');
    } catch (error) {
      console.error('Error sending Slack notification', error);
    }
  });
});