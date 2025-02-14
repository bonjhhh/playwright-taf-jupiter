import { test, expect } from '../fixtures/jupiter-test';
import { generateRandomData } from '../utils/test-data';

test.describe('Contact Page Tests', () => {
  test('Test Case 2: Validate successful submission message', async ({ homePage, contactPage, page }) => {
    for (let i = 0; i < 5; i++) {
      // Step 1: From the home page go to contact page
      await homePage.navigate();
      await homePage.goToContactPage();

      // Step 2: Populate mandatory fields with random data
      const { forename, email, message, telephone } = generateRandomData();
      await contactPage.fillMandatoryFields(forename, email, message, telephone);

      // Step 3: Click submit button
      await contactPage.submitForm();

      
      // Step 4: Check ARIA snapshot
      await expect(page.locator('body')).toMatchAriaSnapshot(`- heading "Sending Feedback" [level=1]`);
      
      // Step 5: Validate successful submission message
      const successMessage = await contactPage.getSuccessMessage();
      expect(successMessage).toContain(`Thanks ${forename}, we appreciate your feedback.`);

      
    }
  });
});