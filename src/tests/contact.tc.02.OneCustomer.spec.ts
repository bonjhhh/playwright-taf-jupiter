import { test } from '../fixtures/jupiter-test';
import { testData } from '../data/contact/tc02-test-data';

test.describe('Contact Page Tests - Same Customer', () => {
  for (let i = 0; i < 5; i++) {
    test(`${testData.testId}: ${testData.testName} - Run ${i + 1}`, async ({ homePage, contactPage }) => {
      await test.step('Step 1: From the home page go to contact page', async () => {
        await homePage.navigate();
        await homePage.goToContactPage();
      });

      await test.step('Step 2: Populate mandatory fields', async () => {
        await contactPage.fillMandatoryFields(
          testData.forename!,
          testData.email!,
          testData.message!
        );
      });

      await test.step('Step 3: Submit the form', async () => {
        await contactPage.submitForm();
      });

      await test.step('Step 4: Check ARIA snapshot', async () => {
        await contactPage.checkAriaSnapshotSendingFeedback();
      });

      await test.step('Step 5: Validate successful submission message', async () => {
        await contactPage.validateSuccessMessage(testData.forename!);
      });

    });
  }
});