import { ContactTestCase } from '../../models/testCase';

export const testData: ContactTestCase = {
  testId: "TC01",
  testName: "Verify error messages and populate mandatory fields",
  description: "This test case verifies the error messages for mandatory fields and populates them.",
  forename: "Clark",
  surname: "Kent",
  email: "clark_kent@example.com",
  telephone: "1234567890",
  message: "This is a test message",
  expectedForenameError: "Forename is required",
  expectedSurnameError: "",
  expectedEmailError: "Email is required",
  expectedTelephoneError: "",
  expectedMessageError: "Message is required"
};