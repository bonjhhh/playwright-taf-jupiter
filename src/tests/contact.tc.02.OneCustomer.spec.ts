import { test, expect } from '../fixtures/jupiter-test';
import testData from '../data/contact/tc02-test-data.json';

test.describe('Contact Page Tests - Same Customer', () => {
  for (let i = 0; i < 5; i++) {
    test(`Test Case 2: Verify successful form submission - Run ${i + 1}`, async ({ homePage, contactPage }) => {
      await test.step('Step 1: From the home page go to contact page', async () => {
        await homePage.navigate();
        await homePage.goToContactPage();
      });

      await test.step('Step 2: Populate mandatory fields', async () => {
        await contactPage.fillMandatoryFields(testData.forename, testData.email, testData.message, testData.telephone);
      });

      await test.step('Step 3: Submit the form', async () => {
        await contactPage.submitForm();
      });

      await test.step('Step 4: Verify successful submission', async () => {
        const successMessage = await contactPage.getSuccessMessage();
        expect(successMessage).toContain(`Thanks ${testData.forename}, we appreciate your feedback.`);
      });
    });
  }
});