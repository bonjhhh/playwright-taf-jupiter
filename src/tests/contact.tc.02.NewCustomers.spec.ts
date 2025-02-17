import { test } from '../fixtures/jupiter-test';
import { generateRandomData } from '../utils/test-data';
import { testData } from '../data/contact/tc02-test-data';

test.describe('Contact Page Tests - New Customers', () => {
  for (let i = 1; i <= 5; i++) {
    test(`${testData.testId}: ${testData.testName} - Run ${i}`, async ({ homePage, contactPage, page }) => {
      let forename: string;
      await test.step('Step 1: From the home page go to contact page', async () => {
        await homePage.navigate();
        await homePage.goToContactPage();
      });

      await test.step('Step 2: Populate mandatory fields with random data', async () => {
        const data = generateRandomData();
        forename = data.forename;
        const { email, message, telephone } = data;
        await contactPage.fillMandatoryFields(forename, email, message, telephone);
      });

      await test.step('Step 3: Click submit button', async () => {
        await contactPage.submitForm();
      });

      await test.step('Step 4: Check ARIA snapshot', async () => {
        await contactPage.checkAriaSnapshotSendingFeedback();
      });

      await test.step('Step 5: Validate successful submission message', async () => {
        await contactPage.validateSuccessMessage(forename);
      });
      
    });
  }
});