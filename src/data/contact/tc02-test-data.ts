import { ContactTestCase } from '../../models/testCase';

export const testData: ContactTestCase = {
  testId: "TC02",
  testName: "Verify successful form submission",
  description: "This test case verifies that the contact form can be successfully submitted with valid data.",
  forename: "Jane",
  surname: "Doe",
  email: "jane@example.com",
  telephone: "0987654321",
  message: "This is another test message",
  expectedForenameError: "",
  expectedSurnameError: "",
  expectedEmailError: "",
  expectedTelephoneError: "",
  expectedMessageError: ""
};