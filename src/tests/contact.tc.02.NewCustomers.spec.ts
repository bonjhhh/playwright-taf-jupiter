import { test, expect } from '../fixtures/jupiter-test';
import { generateRandomData } from '../utils/test-data';

test.describe('Contact Page Tests - New Customers', () => {
  test('Test Case 2: Validate successful submission message', async ({ homePage, contactPage, page }) => {
    for (let i = 0; i < 5; i++) {
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
        await expect(page.locator('body')).toMatchAriaSnapshot(`- heading "Sending Feedback" [level=1]`);
      });

      await test.step('Step 5: Validate successful submission message', async () => {
        const successMessage = await contactPage.getSuccessMessage();
        expect(successMessage).toContain(`Thanks ${forename}, we appreciate your feedback.`);
      });
    }
  });
});