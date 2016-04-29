#!/usr/bin/env node

'use strict';

const notifier = require('node-notifier'),
  HubNotifications = require('github-notifications'),
  yaml = require('js-yaml'),
  fs = require('fs'),
  leftpad = require('left-pad'),
  ellipsis = require('text-ellipsis');

try {
  var config = yaml.safeLoad(fs.readFileSync('livehub.yaml', 'utf8'));
} catch (e) {
  console.log('Unable to load livehub.yaml config!:');
  console.log(e);
  process.exit(1);
}

const gnotify = HubNotifications(config.token);

let lastNotification = null;
gnotify.on('data', function(notification) {
  if (lastNotification !== null && notification.id === lastNotification.id) {
    console.log(`Duplicate notification: #{$notification.id}`);
    return;
  }
  lastNotification = notification;

  const title = `${notification.subject.type} (${notification.reason}): ${notification.repository.full_name}`;
  const message = notification.subject.title;
  const url = notification.repository.html_url;

  notifier.notify({title: title, message: `${ellipsis(message, 50, {ellipsis: '..'})} ${url}`});

  const log = {
    ID: notification.id,
    TITLE: title,
    MESSAGE: message,
    URL: url
  };

  console.log();
  for (const row in log) {
    console.log(`${leftpad(row, 10)}: ${log[row]}`);
  }
});
