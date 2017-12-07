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
