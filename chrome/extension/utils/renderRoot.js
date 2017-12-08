import React from 'react';
import ReactDOM from 'react-dom';
import Root, { TYPE } from '../../../app/Root';

export const renderPlaylistContainer = store => {
  const reactRoot = document.createElement('li');
  reactRoot.id = 'yt-playlists';

  const eltToInject = document.querySelector('#browse-items-primary > ol'); //TODO put this in config
  if (eltToInject) {
    eltToInject.insertBefore(reactRoot, eltToInject.firstChild);
  } else {
    document.body.appendChild(reactRoot);
  }

  ReactDOM.render(
    <Root
      store={store}
      type={TYPE.PLAYLIST_CONTAINER}
    />,
    document.querySelector('#yt-playlists')
  );
};

export const renderSubscriptionButtons = store => {
  const eltsToInject = [...document.querySelectorAll('.yt-lockup-thumbnail')]; //TODO put this in config

  eltsToInject.forEach(elt => {
    // Get the playlist ID from the anchor tag
    const anchor = elt.querySelector('a'); //TODO error handling
    const playlistLink = anchor.href;
    const matches = playlistLink.match(/list=(.+)$/); //TODO error handling
    const playlistId = matches[1];

    const reactRoot = document.createElement('div');
    reactRoot.className = 'yt-playlists-sub-btn-root';
    reactRoot.dataset.playlistid = playlistId;
    elt.appendChild(reactRoot);
  });

  const eltsToRenderInto = [...document.querySelectorAll('.yt-playlists-sub-btn-root')];
  eltsToRenderInto.forEach(elt => {
    ReactDOM.render(
      <Root
        store={store}
        type={TYPE.SUBSCRIPTION_BUTTON}
        playlistId={elt.dataset.playlistid}
      />,
      elt
    );
  });
};

export const renderProminentSubscriptionButton = store => {

};