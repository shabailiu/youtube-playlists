import React from 'react';
import ReactDOM from 'react-dom';
import Root, { TYPE } from '../../app/Root';
import { intializeStoreFromChromeStorage } from './common/inject';

//TODO: Understand Polymer routing events - it doesn't appear any window events fire to detect if DOM has loaded
//window.load only works if it's a refresh or Polymer is disabled

let loaded = false;

const checkLoaded = setInterval(async () => {
  loaded = !!document.getElementById('browse-items-primary');
  console.debug('checking loaded:', loaded);

  if (loaded) {
    clearInterval(checkLoaded);
    injectElementIntoPage();
    const store = await intializeStoreFromChromeStorage();

    ReactDOM.render(
      <Root
        store={store}
        type={TYPE.PLAYLIST_CONTAINER}
      />,
      document.querySelector('#yt-playlists')
    );
  }
}, 250);

const injectElementIntoPage = () => {
  const reactRoot = document.createElement('li');
  reactRoot.id = 'yt-playlists';

  const eltToInject = document.querySelector('#browse-items-primary > ol'); //TODO put this in config
  if (eltToInject) {
    eltToInject.insertBefore(reactRoot, eltToInject.firstChild);
  } else {
    document.body.appendChild(reactRoot);
  }
};
