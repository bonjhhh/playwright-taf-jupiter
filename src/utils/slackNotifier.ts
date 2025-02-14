import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

interface TestResult {
  status: string;
  title: string;
}

interface TestResults {
  suites: {
    tests: TestResult[];
  }[];
}

async function sendSlackNotification(message: any) {
  if (!SLACK_WEBHOOK_URL) {
    console.error('SLACK_WEBHOOK_URL is not set');
    return;
  }

  try {
    await axios.post(SLACK_WEBHOOK_URL, message);
    console.log('Slack notification sent');
  } catch (error) {
    console.error('Error sending Slack notification', error);
  }
}

function generateTestResultsMessage(testResults: TestResults): any {
const passedTests: string[] = [];
  const failedTests: string[] = [];

  testResults.suites.forEach((suite) => {
    suite.tests.forEach((test) => {
      if (test.status === 'passed') {
        passedTests.push(`* ${test.title}: ${test.status}`);
      } else {
        failedTests.push(`* ${test.title}: ${test.status}`);
      }
    });
  });

  const message = {
    attachments: [
      {
        color: passedTests.length > 0 ? 'good' : 'danger',
        title: 'Playwright Test Results',
        text: passedTests.join('\n'),
      },
      {
        color: failedTests.length > 0 ? 'danger' : 'good',
        title: 'Failed Tests',
        text: failedTests.join('\n'),
      },
    ],
  };

  return message;
}

function readTestResults(): TestResults | null {
  const resultsPath = path.resolve(__dirname, '../../artifacts/test-results.json');

  if (!fs.existsSync(resultsPath)) {
    console.error('test-results.json not found');
    return null;
  }

  const rawData = fs.readFileSync(resultsPath, 'utf-8');
  return JSON.parse(rawData) as TestResults;
}

async function main() {
  const testResults = readTestResults();

  if (!testResults) {
    console.error('No test results found');
    return;
  }

  const message = generateTestResultsMessage(testResults);
  await sendSlackNotification(message);
}

main().catch((error) => {
  console.error('Error in slackNotifier', error);
});