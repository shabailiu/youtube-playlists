import * as PlaylistAction from '../constants/PlaylistConstants';
import * as SubscriptionAction from '../constants/SubscriptionConstants';
import { getPlaylistFeedUrl, getPlaylistUrl, parseVideosFromFeed } from '../utils/playlists';
import get from 'lodash/get';

export default (state = {}, action) => {
  let playlistId, feedData, newState;

  switch (action.type) {
    case SubscriptionAction.SUBSCRIBE_TO_PLAYLIST:
      playlistId = action.payload;

      if (state[playlistId]) {
        return state;
      }

      return {
        ...state,
        [playlistId]: {
          feedUrl: getPlaylistFeedUrl(playlistId),
          playlistUrl: getPlaylistUrl(playlistId)
        }
      };
    case SubscriptionAction.UNSUBSCRIBE_FROM_PLAYLIST:
      playlistId = action.payload;

      if (!state[playlistId]) {
        return state;
      }

      newState = {...state};
      delete newState[playlistId];

      return newState;
    case PlaylistAction.HYDRATE_PLAYLIST:
      feedData = action.payload;
      playlistId = get(feedData, 'yt:playlistId[0]');
      const videoData = feedData.entry;

      newState = {...state};
      newState[playlistId].videos = parseVideosFromFeed(videoData);

      return newState;
    default:
      return state;
  }
}