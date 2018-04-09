import React from 'react';
import { COMPONENT_TYPE } from '../../app/AppRoot';
import * as RenderReactRoot from './utils/renderRoot';
import { getPageType, isPageLoaded, mapPageTypeToComponents, mapUrlToPageType } from './utils/ytHelper';
import { Store } from 'react-chrome-redux';
import { MESSAGE_TYPE } from './constants';

console.debug('[ytp] extension/inject loaded from:', location.href);
const maxLoops = 40;

const executeScript = () => {
  const pageType = getPageType(location.href);
  console.debug(`[ytp] PAGE_TYPE (${location.href})`, pageType);
  const componentTypes = mapPageTypeToComponents[pageType] || [];
  let loaded = false;
  let i = 0;
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
      console.log('[ytp] got req ', message);
      break;
  }
});