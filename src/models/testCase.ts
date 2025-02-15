export interface TestCase {
    testId?: string;
    testName?: string
    description?: string;
  }

  export interface ContactTestCase extends TestCase {    
    forename?: string;
    surname?: string;
    email?: string;
    telephone?: string;
    message?: string; 
    expectedForenameError?: string;
    expectedSurnameError?: string;
    expectedEmailError?: string;
    expectedTelephoneError?: string;
    expectedMessageError?: string;
  }

  export interface ShopAndCartTestCase extends TestCase {    
    stuffedFrogQuantity?: number;
    fluffyBunnyQuantity?: number;
    valentineBearQuantity?: number;
    expectedStuffedFrogPrice?: number;
    expectedFluffyBunnyPrice?: number;
    expectedValentineBearPrice?: number;
    cartCount?: number;
           
  }

  // For future use
  export interface ErrorsTestCase extends TestCase {
    
  }