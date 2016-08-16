# Install

## Firefox

- Type `about:debugging` in addressbar
- Click in "Load Temporary Addon"
- Select manifest.json file

  See a example: [GIF animation with example for load add-on in Firefox](guides/firefox.gif)

## Chrome

- Type `chrome://extensions/` in addressbar
- Check "Developer mode"
- Click in "Load unpacked extension"
- Select folder from sources

## Opera

- Type `chrome://extensions/` (or `about:extensions`) in addressbar
- Click in button "Developer mode"
- Click in "Load unpacked extension"
- Select folder from sources

## Debugging in Opera or Chrome

- Click with right mouse button, and select "Inspect pop-up"
- Go to Console tab in "Developer Tools" and type your commands

(More details: https://developer.chrome.com/extensions/tut_debugging)

## Debugging in Firefox

**Note:** Requires Firefox 48 (or Developer Edition) for load of temporary add-on

- Go to chrome folder (from this project) and select background.js
- After addon is showed, click on "Debug" button (on right extension)
- In Console tab type your commands

(More details: https://developer.mozilla.org/en-US/docs/Tools/about:debugging)
