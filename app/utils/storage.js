// function saveState(state) {
//   chrome.storage.local.set({ state: JSON.stringify(state) });
// }
//
// // todos unmarked count
// function setBadge(todos) {
//   if (chrome.browserAction) {
//     const count = todos.filter(todo => !todo.marked).length;
//     chrome.browserAction.setBadgeText({ text: count > 0 ? count.toString() : '' });
//   }
// }
//
// export default function () {
//   return next => (reducer, initialState) => {
//     const store = next(reducer, initialState);
//     store.subscribe(() => {
//       const state = store.getState();
//       saveState(state);
//       setBadge(state.todos);
//     });
//     return store;
//   };
// }

const STATE_KEY = 'yt-playlists';

export const addPlaylistFeed = playlistId => {
  const playlistFeed = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;
  saveStorage()
};

export const saveStorage = async (storage) => {
  try {
    return await chrome.storage.sync.set({
      [STATE_KEY]: storage
    });
  } catch (err) {
    return undefined;
  }
};

export const retrieveStorage = async () => {
  //TODO think about caching the playlists once they're retrieved from RSS feed
  try {
    console.log('About to retrieve storage');
    const storage = await chrome.storage.sync.get(STATE_KEY);
    console.log('Storage retrieved', storage);
    return storage;
  } catch (err) {
    return undefined;
  }
};