const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file

// Path to test-results.json
const resultsPath = path.resolve(__dirname, '../../test-results.json');
const packageJsonPath = path.resolve(__dirname, '../../package.json');

let results;

// Read the npm script name from package.json
let npmScriptName = 'default-script-name'; // Default value in case script name is not found
try {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  npmScriptName = packageJson.scripts.test || npmScriptName;
} catch (error) {
  console.error('Error reading package.json:', error);
}

if (fs.existsSync(resultsPath)) {
  results = JSON.parse(fs.readFileSync(resultsPath, 'utf-8'));
  // Commented this in the meantime to avoid logging the entire test results
  //console.log('Test Results:', JSON.stringify(results, null, 2)); // Add logging to inspect test results
} else {
  console.error(`Error: ${resultsPath} does not exist.`);
  process.exit(1); // Exit with an error
}

if (!results.suites) {
  console.error('No test suites found in test results');
  process.exit(1); // Exit with an error
}

// Flatten the nested suites structure
function flattenSuites(suites) {
  return suites.reduce((acc, suite) => {
    if (suite.suites && suite.suites.length > 0) {
      return acc.concat(flattenSuites(suite.suites));
    }
    return acc.concat(suite);
  }, []);
}

const flattenedSuites = flattenSuites(results.suites);
console.log('Flattened Suites:', JSON.stringify(flattenedSuites, null, 2)); // Add logging to inspect flattened suites

// Calculate test stats
const totalTests = flattenedSuites.reduce((acc, suite) => acc + (suite.specs ? suite.specs.reduce((specAcc, spec) => specAcc + (spec.tests ? spec.tests.length : 0), 0) : 0), 0);

const passedTests = flattenedSuites.reduce((acc, suite) => {
  return acc + (suite.specs ? suite.specs.reduce((specAcc, spec) => specAcc + (spec.tests ? spec.tests.filter(test => test.results.every(result => result.status === 'passed')).length : 0), 0) : 0);
}, 0);

const failedTests = flattenedSuites.reduce((acc, suite) => {
  return acc + (suite.specs ? suite.specs.reduce((specAcc, spec) => specAcc + (spec.tests ? spec.tests.filter(test => test.results.some(result => result.status === 'failed')).length : 0), 0) : 0);
}, 0);

const status = failedTests === 0 ? 'PASSED' : 'FAILED';
const color = failedTests === 0 ? process.env.SUCCESS_COLOR : process.env.FAILURE_COLOR;
const executionTime = results.stats.duration;

const durationInMilliseconds = executionTime; // Already in milliseconds
const durationInSeconds = durationInMilliseconds / 1000; // Convert to seconds
const formattedExecutionTime = `${(durationInMilliseconds / 60000).toFixed(2)} mins`; // Convert to minutes

console.log(`Duration in milliseconds: ${durationInMilliseconds} ms`);
console.log(`Duration in seconds: ${durationInSeconds.toFixed(2)} seconds`);
console.log(`Duration in minutes: ${formattedExecutionTime} minutes`);

// Construct Slack payload
const pipelineUrl = process.env.GITHUB_JOB_URL || 'Run locally';

const payload = {
  channel: process.env.SLACK_CHANNEL,
  text: `*Test Result Notification*\n\n*Status:* :${status === 'PASSED' ? 'white_check_mark' : 'x'}: *${status}*\n*Total Tests:* ${totalTests}\n*Passed Tests:* ${passedTests}\n*Failed Tests:* ${failedTests}\n*Execution Time:* ${formattedExecutionTime}\n*Pipeline URL:* <${pipelineUrl}|View Pipeline>\n*NPM Script Name:* ${npmScriptName}`,
  attachments: [
    {
      color: color,
      title: 'Playwright Test Result',
      text: `Pipeline URL: <${pipelineUrl}|View Pipeline>`,
      image_url: failedTests === 0
        ? 'https://via.placeholder.com/300x100/36a64f/FFFFFF?text=Test+Pass'
        : 'https://via.placeholder.com/300x100/ff0000/FFFFFF?text=Test+Fail',
      thumb_url: failedTests === 0
        ? 'https://via.placeholder.com/75x75/36a64f/FFFFFF?text=Test+Pass'
        : 'https://via.placeholder.com/75x75/ff0000/FFFFFF?text=Test+Fail',
    },
  ],
};

// Save payload to file
fs.writeFileSync('payload.json', JSON.stringify(payload));

// Send Slack notification
async function sendSlackNotification() {
  if (!process.env.SLACK_WEBHOOK_URL) {
    console.error('SLACK_WEBHOOK_URL is not set');
    return;
  }

  try {
    await axios.post(process.env.SLACK_WEBHOOK_URL, payload);
    console.log('Slack notification sent');
  } catch (error) {
    console.error('Error sending Slack notification', error);
  }
}

sendSlackNotification();