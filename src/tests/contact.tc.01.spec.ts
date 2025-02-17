import { test } from '../fixtures/jupiter-test';
import { testData } from '../data/contact/tc01-test-data';

test.describe('Contact Page Tests', () => {
  test(`${testData.testId}: ${testData.testName}`, async ({ homePage, contactPage }) => {
    await test.step('Step 1: From the home page go to contact page', async () => {
      await homePage.navigate();
      await homePage.goToContactPage();
    });

    await test.step('Step 2: Click submit button', async () => {
      await contactPage.submitForm();
    });

    await test.step('Step 3: Verify error messages', async () => {
      await contactPage.verifyErrorMessages(
        testData.expectedForenameError!,
        testData.expectedEmailError!,
        testData.expectedMessageError!
      );
    });

    await test.step('Step 4: Populate mandatory fields', async () => {
      await contactPage.fillMandatoryFields(testData.forename!, testData.email!, testData.message!, testData.telephone!);
    });

    await test.step('Step 5: Validate errors are gone', async () => {
      await contactPage.validateErrorsAreGone();
    });
  });
});