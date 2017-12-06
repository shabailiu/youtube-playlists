import React from 'react';
import ReactDOM from 'react-dom';
import Root, { TYPE } from '../../app/containers/Root';

const mockState = {
  playlists: {
    'PL96C35uN7xGI9HGKHsArwxiOejecVyNem': {
      url: 'https://www.youtube.com/feeds/videos.xml?playlist_id=PL96C35uN7xGI9HGKHsArwxiOejecVyNem',
      channelId: 'UCBa659QWEk1AI4Tg--mrJ2A',
      videos: [
        {
          videoTitle: 'Why Hold Music Sounds Worse Now',
          videoUrl: 'https://www.youtube.com/v/w2A8q3XIhu0?version=3',
          thumbnailImg: 'https://i4.ytimg.com/vi/w2A8q3XIhu0/hqdefault.jpg',
          channelName: 'Tom Scott',
          channelUrl: 'https://www.youtube.com/channel/UCBa659QWEk1AI4Tg--mrJ2A',
          views: 559260,
          timestamp: '2017-11-27T16:00:04+00:00'
        }
      ]
    }
  },
};

window.addEventListener('load', async () => {
  injectElementIntoPage();
  // const state = await retrieveStorage();
  // const initialState = JSON.parse(state || '{}');
  const initialState = mockState;
  const createStore = require('../../app/store/configureStore');

  ReactDOM.render(
    <Root
      store={createStore(initialState)}
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

const retrieveStorage = () => {
  //TODO think about caching the playlists once they're retrieved from RSS feed
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('yt-playlists', obj => resolve(obj));
  });
};
