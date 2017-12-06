import { retrieveStorage, saveStorage } from '../../../app/utils/storage';
import throttle from 'lodash/throttle';
import createStore from '../../../app/store/configureStore';

export const intializeStoreFromChromeStorage = async () => {
  const initialState = await retrieveStorage();
  const store = createStore(initialState);

  store.subscribe(throttle(async () => {
    await saveStorage(store.getState());
    console.debug('Saved storage to Chrome');
  }, 1000));

  return store;
};
