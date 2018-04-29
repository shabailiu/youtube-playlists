import React from 'react';
import ReactDOM from 'react-dom';
import Root, { COMPONENT_TYPE } from '../../../app/AppRoot';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

export const renderPlaylistContainer = store => {
  const PLAYLIST_QUERY_SELECTOR = '#ytp';
  const eltToInject = document.querySelector('ytd-browse > ytd-two-column-browse-results-renderer > ytd-section-list-renderer');

  // Only inject if the element exists and there is no subscription container already
  if (eltToInject && !document.querySelector(PLAYLIST_QUERY_SELECTOR)) {
    const reactRoot = document.createElement('div');
    reactRoot.id = 'ytp';
    eltToInject.insertBefore(reactRoot, eltToInject.firstChild);

    store.ready().then(() => {
      ReactDOM.render(
        <Root
          store={store}
          type={COMPONENT_TYPE.PLAYLIST_CONTAINER}
        />,
        document.querySelector(PLAYLIST_QUERY_SELECTOR)
      );
    });
  }
};

export const renderSubscriptionButtons = store => {
  const BUTTON_QUERY_SELECTOR = '.ytp-sub-btn-root';
  const eltsToInject = [...document.querySelectorAll('ytd-playlist-thumbnail')]; //TODO put this in config
  const reactRoots = [];

  eltsToInject.forEach(elt => {
    // Don't inject if it already exists
    if (elt.querySelector(BUTTON_QUERY_SELECTOR)) {
      return;
    }

    // Get the playlist ID from the anchor tag
    const anchor = elt.querySelector('a'); //TODO error handling
    if (!anchor) {
      return console.error('[ytp] renderSubscriptionButtons: Unable to find anchor tag in:', elt);
    }

    const playlistLink = anchor.href;
    const matches = playlistLink.match(/list=(.+)$/); //TODO error handling
    if (isEmpty(matches)) {
      return console.error('[ytp] renderSubscriptionButtons: Unable to retrieve playlist ID from link:', playlistLink);
    }

    const playlistId = matches[1];

    const reactRoot = document.createElement('div');
    reactRoot.className = 'ytp-sub-btn-root';
    reactRoot.dataset.playlistid = playlistId;
    elt.appendChild(reactRoot);
    reactRoots.push(reactRoot);
  });

  store.ready().then(() => {
    reactRoots.forEach(elt => {
      ReactDOM.render(
        <Root
          store={store}
          type={COMPONENT_TYPE.SUBSCRIPTION_BUTTON}
          playlistId={elt.dataset.playlistid}
        />,
        elt
      );
    });
  });
};

export const renderProminentSubscriptionButton = store => {
  const plHeader = document.getElementById('pl-header');
  const eltToInject = plHeader.querySelector('.pl-header-thumb');

  if (!plHeader || !eltToInject) {
    return;
  }

  const playlistId = get(plHeader, 'dataset.fullListId');

  const reactRoot = document.createElement('div');
  reactRoot.className = 'ytp-sub-btn-root';
  reactRoot.dataset.playlistid = playlistId;
  eltToInject.appendChild(reactRoot);

  store.ready().then(() => {
    ReactDOM.render(
      <Root
        store={store}
        type={COMPONENT_TYPE.SUBSCRIPTION_BUTTON}
        playlistId={playlistId}
      />,
      reactRoot
    );
  });
};