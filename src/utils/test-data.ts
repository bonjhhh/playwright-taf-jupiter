export function generateRandomData() {
    const forename = `John${Math.floor(Math.random() * 1000)}`;
    const email = `john${Math.floor(Math.random() * 1000)}@example.com`;
    const message = `This is a test message ${Math.floor(Math.random() * 1000)}`;
    const telephone = `123456789${Math.floor(Math.random() * 10)}`;
  
    return { forename, email, message, telephone };
  }