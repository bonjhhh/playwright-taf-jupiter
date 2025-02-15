const { Reporter } = require('@playwright/test/reporter');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

class SlackReporter {
  async onEnd(result) {
    console.log('All tests finished. Sending Slack notification...');
    try {
      const { stdout, stderr } = await execPromise('node src/utils/notifySlack.js');
      console.log('Slack notification sent');
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
    } catch (error) {
      console.error('Error sending Slack notification', error);
    }
  }
}

module.exports = SlackReporter;