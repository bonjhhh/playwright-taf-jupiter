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

  export type ToyName = 
  | 'Teddy Bear'
  | 'Stuffed Frog'
  | 'Handmade Doll'
  | 'Fluffy Bunny'
  | 'Smiley Bear'
  | 'Funny Cow'
  | 'Valentine Bear'
  | 'Smiley Face';

  export interface ToyOrder {
    toyName: ToyName;
    quantity: number;
  }
  
  export interface ShopAndCartTestCase extends TestCase {
    toyOrders?: ToyOrder[];
    expectedPrices?: {
      [key in ToyName]?: number;
    };
    cartCount?: number;
  }

  // For future use
  export interface ErrorsTestCase extends TestCase {
    
  }