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

const arrowURLs = ['^https://www\\.youtube\\.com/feed/subscriptions'];

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status !== 'loading' || !tab.url.match(arrowURLs.join('|'))) {
    return;
  }
  const result = await isInjected(tabId);
  if (chrome.runtime.lastError || result[0]) {
    return;
  }

  loadScript('inject-playlist', tabId, () => console.log('load inject playlist bundle success!'));
});

//TODO need to add subscription buttons on playlist page
/**
 * should I have a different bundle for this scenario? I imagine yes, so that we can minimize the size? and probably another listener
 */

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status !== 'loading' || !tab.url.match('https://www\\.youtube\\.com/.+/.+/playlists')) {
    return;
  }
  const result = await isInjected(tabId);
  if (chrome.runtime.lastError || result[0]) {
    return;
  }

  loadScript('inject-subscription-button', tabId, () => console.log('load inject subscription button bundle success!'));
});