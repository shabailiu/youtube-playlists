import React from 'react';
import ReactDOM from 'react-dom';
import Root, { TYPE } from '../../app/Root';
import { intializeStoreFromChromeStorage } from './common/inject';

window.addEventListener('load', async () => {
  injectElementIntoPage();
  const store = await intializeStoreFromChromeStorage();

  ReactDOM.render(
    <Root
      store={store}
      type={TYPE.PLAYLIST_CONTAINER}
    />,
    document.querySelector('#yt-playlists')
  );
});

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
