import React from 'react';
import ReactDOM from 'react-dom';
import Root, { TYPE } from '../../app/containers/Root';
import { retrieveStorage, saveStorage } from '../../app/utils/storage';
import throttle from 'lodash/throttle';

const mockState = {
  playlists: {
    'LLf4FYTsGFFcdc68AUPIU3RA': {
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
  const initialState = await retrieveStorage();
  // const initialState = mockState;
  const createStore = require('../../app/store/configureStore');
  const store = createStore(initialState);

  store.subscribe(throttle(async () => {
    await saveStorage(store.getState());
    console.log('Saved storage to Chrome');
  }, 1000));

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
});

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
