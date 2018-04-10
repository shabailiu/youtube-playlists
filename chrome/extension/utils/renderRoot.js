import React from 'react';
import ReactDOM from 'react-dom';
import Root, { COMPONENT_TYPE } from '../../../app/AppRoot';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

export const renderPlaylistContainer = store => {
  const eltToInject = document.querySelector('ytd-browse > ytd-two-column-browse-results-renderer > ytd-section-list-renderer > #contents');

  if (eltToInject) {
    const reactRoot = document.createElement('div');
    reactRoot.id = 'ytp';
    eltToInject.insertBefore(reactRoot, eltToInject.firstChild);

    store.ready().then(() => {
      ReactDOM.render(
        <Root
          store={store}
          type={COMPONENT_TYPE.PLAYLIST_CONTAINER}
        />,
        document.querySelector('#ytp')
      );
    });
  }
};

export const renderSubscriptionButtons = store => {
  const eltsToInject = [...document.querySelectorAll('.yt-lockup-playlist .yt-lockup-thumbnail')]; //TODO put this in config
  const reactRoots = [];

  eltsToInject.forEach(elt => {
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