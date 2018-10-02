// Sets one or more keys, expecting key-value pairs
export const saveStorage = storage => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set(storage, () => {
      if (chrome.runtime.lastError) {
        console.error('[ytp] Storage failed to save', chrome.runtime.lastError);
        reject(chrome.runtime.lastError);
      } else {
        console.log('[ytp] Storage saved', storage);
        resolve();
      }
    });
  });
};

// Retrieves one key value pair, or the entire storage
export const retrieveStorage = (key = null) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(key, storage => {
      if (chrome.runtime.lastError) {
        console.error('[ytp] Storage failed to retrieve', chrome.runtime.lastError);
        reject(chrome.runtime.lastError);
      } else {
        console.log('[ytp] Storage retrieved', storage);
        resolve(storage);
      }
    });
  });
};