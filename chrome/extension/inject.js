import React from 'react';
import { TYPE } from '../../app/Root';
import { initializeStoreFromChromeStorage } from './utils/storage';
import * as RenderReactRoot from './utils/renderRoot';

console.debug('extension/inject loaded from:', location.href);

export const mapUrlToComponentType = {
  '^http(s?)://www\\.youtube\\.com/feed/subscriptions': TYPE.PLAYLIST_CONTAINER,
  '^http(s?)://www\\.youtube\\.com/.+/.+/playlists': TYPE.SUBSCRIPTION_BUTTON,
  '^http(s?)://www\\.youtube\\.com/playlist': TYPE.PROMINENT_SUBSCRIPTION_BUTTON
};

const determineComponentType = () => {
  const url = location.href;
  const key = Object.keys(mapUrlToComponentType).find(urlMatch => !!url.match(urlMatch));
  return mapUrlToComponentType[key];
};

const componentType = determineComponentType();
let loaded = false;

const checkLoaded = setInterval(async () => {
  loaded = determinePageLoad();
  console.debug('is loaded', loaded);

  if (loaded) {
    clearInterval(checkLoaded);
    const store = await initializeStoreFromChromeStorage(); //TODO can we move this up
    injectElementIntoPage(store);
  }
}, 250);

//TODO: Understand Polymer routing events - it doesn't appear any window events fire to detect if DOM has loaded
//window.load only works if it's a refresh or Polymer is disabled
const determinePageLoad = () => {
  switch (componentType) {
    case TYPE.PLAYLIST_CONTAINER:
      return !!document.getElementById('browse-items-primary');
    case TYPE.SUBSCRIPTION_BUTTON:
      return !!document.getElementById('browse-items-primary');
    case TYPE.PROMINENT_SUBSCRIPTION_BUTTON:
      return !!document.getElementById('pl-header');
    default:
      return true;
  }
};

const injectElementIntoPage = store => {
  switch (componentType) {
    case TYPE.PLAYLIST_CONTAINER:
      return RenderReactRoot.renderPlaylistContainer(store);
    case TYPE.SUBSCRIPTION_BUTTON:
      return RenderReactRoot.renderSubscriptionButtons(store);
    case TYPE.PROMINENT_SUBSCRIPTION_BUTTON:
      return RenderReactRoot.renderProminentSubscriptionButton(store);
  }
};
