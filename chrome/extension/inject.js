import React from 'react';
import * as RenderReactRoot from './utils/renderRoot';
import {
  getPageType,
  isAJAXPageResponse,
  PAGE_TYPE
} from './utils/ytHelper';
import { Store } from 'react-chrome-redux';
import { MESSAGE_TYPE } from './constants';

console.debug('[ytp] extension/inject loaded from, executing script:', location.href);

const executeScript = () => {
  const store = new Store({
    portName: 'MY_APP'
  });

  console.debug('[ytp] executing script');

  if (getPageType(window.location.href) === PAGE_TYPE.SUBSCRIPTION_HOME) {
    console.debug('[ytp] rendering playlist container', window.location.href);
    RenderReactRoot.renderPlaylistContainer(store);
  }

  console.debug('[ytp] rendering sub buttons');
  RenderReactRoot.renderSubscriptionButtons(store);
};

executeScript();

chrome.runtime.onMessage.addListener((message = {}, sender, sendResponse) => {
  const { type, payload } = message;

  switch (type) {
    case MESSAGE_TYPE.EXECUTE_SCRIPT: //TODO do we still need this?
      if (payload) {
        console.debug('[ytp] bundle already loaded; executing script');
        executeScript();
      }
      break;
    case MESSAGE_TYPE.AJAX_RESPONSE:
      if (isAJAXPageResponse(payload)) {
        console.log('[ytp] got res, executing script ', message);
        executeScript();
      }
      break;
  }
});