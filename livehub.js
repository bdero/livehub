'use strict';

const notifier = require('node-notifier'),
  HubNotifications = require('github-notifications'),
  yaml = require('js-yaml'),
  fs = require('fs'),
  leftpad = require('left-pad');

try {
  var config = yaml.safeLoad(fs.readFileSync('livehub.yaml', 'utf8'));
} catch (e) {
  console.log('Unable to load livehub.yaml config!:');
  console.log(e);
  process.exit(1);
}

const gnotify = HubNotifications(config.token);

gnotify.on('data', function(notification) {
  const title = `${notification.subject.type} (${notification.reason}): ${notification.repository.full_name}`;
  const message = `${notification.subject.title}`;

  notifier.notify({title: title, message: message});

  const log = {
    TITLE: `${title}`,
    MESSAGE: `${message}`,
    URL: `${notification.repository.html_url}`
  }

  console.log();
  for (const row in log) {
    console.log(`${leftpad(row, 10)}: ${log[row]}`);
  }
});
