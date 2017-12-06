import * as PlaylistAction from '../constants/PropTypeValidation';
import * as SubscriptionAction from '../constants/SubscriptionConstants';

export default (state = {}, action) => {
  let playlistId;

  switch (action.type) {
    case SubscriptionAction.SUBSCRIBE_TO_PLAYLIST:
      playlistId = action.payload;

      if (state[playlistId]) {
        return state;
      }

      return {
        ...state,
        [playlistId]: {
          feedUrl: `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`
        }
      };
    case SubscriptionAction.UNSUBSCRIBE_FROM_PLAYLIST:
      playlistId = action.payload;

      if (!state[playlistId]) {
        return state;
      }

      const newState = {...state};
      delete newState[playlistId];

      return newState;
    default:
      return state;
  }
}