import * as PlaylistAction from '../constants/PlaylistConstants';
import * as SubscriptionAction from '../constants/SubscriptionConstants';
import { hydratePlaylist } from '../utils/playlists';
import get from 'lodash/get';

export default (state = {}, action) => {
  let playlistId, feedData, feedDataArr, newState;

  switch (action.type) {
    case SubscriptionAction.SUBSCRIBE_TO_PLAYLIST:
      playlistId = action.payload;

      if (state[playlistId]) {
        return state;
      }

      return {
        ...state,
        [playlistId]: {}
      };
    case SubscriptionAction.UNSUBSCRIBE_FROM_PLAYLIST:
      playlistId = action.payload;

      if (!state[playlistId]) {
        return state;
      }

      newState = { ...state };
      delete newState[playlistId];

      return newState;
    case PlaylistAction.HYDRATE_PLAYLIST:
      feedData = action.payload;
      playlistId = get(feedData, 'yt:playlistId[0]');

      newState = { ...state };
      newState[playlistId] = Object.assign(newState[playlistId], hydratePlaylist(playlistId, feedData));

      return newState;
    case PlaylistAction.HYDRATE_ALL_PLAYLISTS:
      feedDataArr = action.payload;
      newState = { ...state };

      feedDataArr.forEach(feedData => {
        playlistId = get(feedData, 'yt:playlistId[0]');
        newState[playlistId] = Object.assign(newState[playlistId], hydratePlaylist(playlistId, feedData));
      });

      return newState;
    default:
      return state;
  }
}