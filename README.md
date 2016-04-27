# livehub

Cross platform desktop notifications for GitHub.

## Installation

First, install globally:
```sh
npm install -g bdero/livehub
```

Second, place a `livehub.yaml` file in the current directory:

```yaml
# Copy this file to "livehub.yaml" and fill in the configuration below.

# Access tokens can be created here: https://github.com/settings/tokens
# Note: Make sure the token has "notifications" permission!

token: 'place token here'
```

Lastly, run `livehub`.

## Known issues

- On startup, it will spam your notification tray if you have a lot of unread notifications.
- I haven't tested this on any other notification system besides Gnome 3, but the notifications are powered by [node-notifier](https://www.npmjs.com/package/node-notifier), so *hopefully* it's cross platform.
