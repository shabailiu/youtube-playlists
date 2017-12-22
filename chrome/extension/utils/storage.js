import throttle from 'lodash/throttle';
import createStore from '../../../app/store/configureStore';
import { getPlaylistFeedUrl } from '../../../app/utils/playlists';
import { wrapStore } from 'react-chrome-redux';

const STATE_KEY = 'yt-playlists';

export const saveStorage = storage => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({
      [STATE_KEY]: storage
    }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        console.log('Storage saved', storage);
        resolve();
      }
    });
  });
};

export const retrieveStorage = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(STATE_KEY, storage => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        console.log('Storage retrieved', storage[STATE_KEY]);
        resolve(storage[STATE_KEY]);
      }
    });
  });
};

export const initializeStoreFromChromeStorage = async () => { //TODO i think this needs to be called in background.js... or background/inject
  const playlistIds = await retrieveStorage();
  const initialState = {
    playlists: {}
  };

  if (playlistIds) {
    playlistIds.forEach(id => {
      initialState.playlists[id] = {
        feedUrl: getPlaylistFeedUrl(id) // Must initialize playlists with feed
      };
    });
  }

  const store = createStore(initialState);

  store.subscribe(throttle(async () => {
    await saveStorage(transformStateForChromeStorage(store.getState()));
  }, 1000));

  wrapStore(store, { portName: 'MY_APP' });

  return store;
};

const transformStateForChromeStorage = state => Object.keys(state.playlists);