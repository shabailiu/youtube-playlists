import throttle from 'lodash/throttle';
import createStore from '../../../../app/store/configureStore';
import { getPlaylistFeedUrl } from '../../../../app/utils/playlists';
import { wrapStore } from 'react-chrome-redux';
import { retrieveStorage, saveStorage } from './chromeHelper';

/**
 * The storage structure for Chrome sync is as follows:
 * 
 * yt-playlists-global:                  Global settings
 * yt-playlists-<account ID>-settings:   Settings per account
 * yt-playlists-<account ID>-subs:       Subscriptions per account
 */

const STATE_KEY_PREFIX = 'yt-playlists';
const GLOBAL_SETTINGS_KEY = `${STATE_KEY_PREFIX}-global`;
const ACCOUNT_SETTINGS_KEY = `${STATE_KEY_PREFIX}-default-settings`;
const ACCOUNT_SUBSCRIPTIONS_KEY = `${STATE_KEY_PREFIX}-default-subs`;

export const initializeStoreFromChromeStorage = async () => {
  const storage = await retrieveStorage();
  const playlistIds = storage[ACCOUNT_SUBSCRIPTIONS_KEY];
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
    try {
      await saveStorage(transformStateForChromeStorage(store.getState()));
    } catch (err) {
      // TODO: If saving failed, notify user
    }
  }, 1000));

  wrapStore(store, { portName: 'MY_APP' });

  return store;
};

const transformStateForChromeStorage = state => ({
  [GLOBAL_SETTINGS_KEY]: {},
  [ACCOUNT_SETTINGS_KEY]: {},
  [ACCOUNT_SUBSCRIPTIONS_KEY]: Object.keys(state.playlists)
});