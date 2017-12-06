import * as PlaylistAction from '../constants/playlists';
import * as SubscriptionAction from '../constants/SubscriptionConstants';

export default (state = {}, action) => {
  switch (action.type) {
    case SubscriptionAction.SUBSCRIBE_TO_PLAYLIST:
      const playlistId = action.payload;

      if (state[playlistId]) {
        return state;
      }

      return {
        ...state,
        [playlistId]: {
          feedUrl: `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`
        }
      };
    default:
      return state;
  }
}