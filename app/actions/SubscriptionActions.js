import * as action from '../constants/SubscriptionConstants';
import { parseRSSFeed, getPlaylistFeedUrl } from '../utils/playlists';

export const subscribeToPlaylist = playlistId => {
  return async (dispatch) => {
    dispatch({
      type: action.SUBSCRIBE_TO_PLAYLIST,
      payload: playlistId
    });

    const feedData = await parseRSSFeed(getPlaylistFeedUrl(playlistId));
    console.log('feed', feedData);
  };
};

export const unsubscribeFromPlaylist = playlistId => ({
  type: action.UNSUBSCRIBE_FROM_PLAYLIST,
  payload: playlistId
});
