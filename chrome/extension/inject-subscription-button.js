import React from 'react';
import ReactDOM from 'react-dom';
import Root, { TYPE } from '../../app/Root';
import { intializeStoreFromChromeStorage } from './common/inject';

//TODO: Understand Polymer routing events - it doesn't appear any window events fire to detect if DOM has loaded
//window.load only works if it's a refresh or Polymer is disabled

let loaded = false;

const checkLoaded = setInterval(async () => {
  loaded = !!document.getElementById('channels-browse-content-grid');
  console.debug('checking loaded:', loaded);

  if (loaded) {
    clearInterval(checkLoaded);
    injectElementIntoPage();
    const store = await intializeStoreFromChromeStorage();

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
  }
}, 250);

const injectElementIntoPage = () => {
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
};
