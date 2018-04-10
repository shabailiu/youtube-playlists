import React from 'react';
import { COMPONENT_TYPE } from '../../app/AppRoot';
import * as RenderReactRoot from './utils/renderRoot';
import { getPageType, isAJAXPageRequest, isPageLoaded, mapPageTypeToComponents, mapUrlToPageType } from './utils/ytHelper';
import { Store } from 'react-chrome-redux';
import { MESSAGE_TYPE } from './constants';

console.debug('[ytp] extension/inject loaded from:', location.href);
const maxLoops = 40;

const executeScript = () => {
  const store = new Store({
    portName: 'MY_APP'
  });

  console.debug('[ytp] executing script');
  RenderReactRoot.renderPlaylistContainer(store);
};

const injectElementIntoPage = (componentType, store) => {
  console.debug('[ytp] injecting element: ' + componentType);
  switch (componentType) {
    case COMPONENT_TYPE.PLAYLIST_CONTAINER:
      return RenderReactRoot.renderPlaylistContainer(store);
    case COMPONENT_TYPE.SUBSCRIPTION_BUTTON:
      return RenderReactRoot.renderSubscriptionButtons(store);
    case COMPONENT_TYPE.PROMINENT_SUBSCRIPTION_BUTTON:
      return RenderReactRoot.renderProminentSubscriptionButton(store);
  }
};

executeScript();

chrome.runtime.onMessage.addListener((message = {}, sender, sendResponse) => {
  const { type, payload } = message;

  switch (type) {
    case MESSAGE_TYPE.EXECUTE_SCRIPT:
      if (payload) {
        console.debug('[ytp] bundle already loaded; executing script');
        executeScript();
      }
      break;
    case MESSAGE_TYPE.AJAX_RESPONSE:
      if (isAJAXPageRequest(payload)) {
        console.log('[ytp] got req ', message);
      }
      break;
  }
});