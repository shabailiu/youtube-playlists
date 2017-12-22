import React from 'react';
import { COMPONENT_TYPE } from '../../app/AppRoot';
import * as RenderReactRoot from './utils/renderRoot';
import { getPageType, isPageLoaded, mapPageTypeToComponents, mapUrlToPageType } from './utils/ytHelper';
import { Store } from 'react-chrome-redux';

console.debug('extension/inject loaded from:', location.href);
const maxLoops = 40;

const executeScript = () => {
  const pageType = getPageType(location.href);
  console.debug(`PAGE_TYPE (${location.href})`, pageType);
  const componentTypes = mapPageTypeToComponents[pageType] || [];
  let loaded = false;
  let i = 0;

  // Check periodically if the page is loaded
  // Necessary until a better solution for tracking Polymer client side redirects is found
  const checkLoaded = setInterval(async () => {
    if (++i > maxLoops) {
      return clearInterval(checkLoaded);
    }

    loaded = isPageLoaded(pageType);
    console.debug(`${pageType} is loaded`, loaded);

    if (loaded) {
      clearInterval(checkLoaded);
      const store = new Store({
        portName: 'MY_APP'
      });
      componentTypes.forEach(componentType => injectElementIntoPage(componentType, store));
    }
  }, 250);
};

const injectElementIntoPage = (componentType, store) => {
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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message && message.execute) {
    console.debug('bundle already loaded; executing script');
    executeScript();
  }
});