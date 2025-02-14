const fs = require('fs');
const path = require('path');
const axios = require('axios');

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

async function sendSlackNotification(message) {
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

function generateTestResultsMessage(testResults) {
  const passedTests = [];
  const failedTests = [];
  let totalTests = 0;
  let passedCount = 0;
  let failedCount = 0;

  testResults.suites.forEach((suite) => {
    suite.tests.forEach((test) => {
      totalTests++;
      if (test.status === 'passed') {
        passedTests.push(`* ${test.title}: ${test.status}`);
        passedCount++;
      } else {
        failedTests.push(`* ${test.title}: ${test.status}`);
        failedCount++;
      }
    });
  });

  const summary = `Total Tests: ${totalTests}\nPassed: ${passedCount}\nFailed: ${failedCount}`;
  const jobLink = process.env.GITHUB_JOB_URL ? `\n\n[View Job in GitHub](${process.env.GITHUB_JOB_URL})` : '';

  const message = {
    attachments: [
      {
        color: passedCount > 0 ? 'good' : 'danger',
        title: 'Playwright Test Results Summary',
        text: summary + jobLink,
      },
      {
        color: passedTests.length > 0 ? 'good' : 'danger',
        title: 'Passed Tests',
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

function readTestResults() {
  const resultsPath = path.resolve(__dirname, '../../artifacts/test-results.json');

  if (!fs.existsSync(resultsPath)) {
    console.error('test-results.json not found');
    return null;
  }

  const rawData = fs.readFileSync(resultsPath, 'utf-8');
  return JSON.parse(rawData);
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
  console.error('Error in notifySlack', error);
});