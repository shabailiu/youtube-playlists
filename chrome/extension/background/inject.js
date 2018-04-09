import { mapUrlToPageType } from '../utils/ytHelper';
import { MESSAGE_TYPE } from '../constants';

function isInjected(tabId) {
  return chrome.tabs.executeScriptAsync(tabId, {
    code: `var injected = window.reactExampleInjected;
      window.reactExampleInjected = true;
      injected;`,
    runAt: 'document_start'
  });
}

function loadScript(name, tabId, cb) {
  if (process.env.NODE_ENV === 'production') {
    chrome.tabs.executeScript(tabId, { file: `/js/${name}.bundle.js`, runAt: 'document_end' }, cb);
  } else {
    // dev: async fetch bundle
    fetch(`http://localhost:3000/js/${name}.bundle.js`)
      .then(res => res.text())
      .then(fetchRes => {
        // Load redux-devtools-extension inject bundle,
        // because inject script and page is in a different context
        const request = new XMLHttpRequest();
        request.open('GET', 'chrome-extension://lmhkpmbekcpmknklioeibfkpmmfibljd/js/redux-devtools-extension.js');  // sync
        request.send();
        request.onload = () => {
          if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            chrome.tabs.executeScript(tabId, { code: request.responseText, runAt: 'document_start' });
          }
        };
        chrome.tabs.executeScript(tabId, { code: fetchRes, runAt: 'document_end' }, cb);
      });
  }
}

const urlTrack = {};
const listeners = {};

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status !== 'loading') {
    return;
  }

  if (tab.url.match(Object.keys(mapUrlToPageType).join('|'))) {
    // Check if script has already been injected (has the page refreshed?)
    const result = await isInjected(tabId);

    if (!chrome.runtime.lastError && !result[0]) {
      // Add listener for AJAX requests to determine if the page has changed
      if (!listeners[tabId]) {
        console.debug(`[ytp] adding AJAX listener for page events for tabId ${tabId}`);
        listeners[tabId] = details => {
          chrome.tabs.sendMessage(tabId, {
            type: MESSAGE_TYPE.AJAX_RESPONSE,
            payload: {
              ...details
            }
          }, function(response) {
            console.log(response);
          });
        };

        chrome.webRequest.onCompleted.addListener(listeners[tabId], { urls: ["*://*.youtube.com/*"] });
      }

      // Load script
      console.debug('[ytp] loading bundle...');
      return loadScript('inject', tabId, () => console.log('[ytp] load inject bundle success!'));
    } else {
      if (result[0]) { // Bundle already loaded
        // Check if the URL has changed
        if (urlTrack[tabId] === tab.url) {
          console.debug('[ytp] url has not changed; ignoring');
          return;
        }

        urlTrack[tabId] = tab.url;
        chrome.tabs.sendMessage(tabId, {
          type: MESSAGE_TYPE.EXECUTE_SCRIPT,
          payload: true
        });
      } else {
        console.debug(`[ytp] failed to load script; lastError (${chrome.runtime.lastError})`);
      }
    }
  }
});

chrome.tabs.onRemoved.addListener(tabId => {
  if (listeners[tabId]) {
    console.debug(`[ytp] removing AJAX listener for tabId ${tabId}`);
    chrome.webRequest.onComplete.removeListener(listeners[tabId]);
    delete listeners[tabId];
  }
});
