import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/containers/Root';

const mockState = {
  playlists: [
    {
      id: 1,
      url: 'https://www.youtube.com/feeds/videos.xml?playlist_id=PL96C35uN7xGI9HGKHsArwxiOejecVyNem'
    }
  ]
};

window.addEventListener('load', async () => {
  injectElementIntoPage();
  // const state = await retrieveStorage();
  // const initialState = JSON.parse(state || '{}');
  const initialState = mockState;
  const createStore = require('../../app/store/configureStore');

  ReactDOM.render(
    <Root store={createStore(initialState)} />,
    document.querySelector('#yt-playlists')
  );
});

const injectElementIntoPage = () => {
  const reactRoot = document.createElement('li');
  reactRoot.id = 'yt-playlists';

  const eltToInject = document.querySelector('#browse-items-primary > ol'); //TODO put this in config
  eltToInject.insertBefore(reactRoot, eltToInject.firstChild);
};

const retrieveStorage = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('yt-playlists', obj => resolve(obj));
  });
};
