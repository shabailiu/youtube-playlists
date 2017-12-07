import { retrieveStorage, saveStorage } from '../../../app/utils/storage';
import throttle from 'lodash/throttle';
import createStore from '../../../app/store/configureStore';
import { initializePlaylist } from '../../../app/utils/playlists';

export const intializeStoreFromChromeStorage = async () => {
  const playlistIds = await retrieveStorage();
  const initialState = {
    playlists: {}
  };

  if (playlistIds) {
    playlistIds.forEach(id => {
      initialState.playlists[id] = initializePlaylist(id)
    });
  }

  const store = createStore(initialState);

  store.subscribe(throttle(async () => {
    await saveStorage(transformStateForChromeStorage(store.getState()));
  }, 1000));

  return store;
};

const transformStateForChromeStorage = state => Object.keys(state.playlists);