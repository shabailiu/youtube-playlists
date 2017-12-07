import * as PlaylistAction from '../constants/PlaylistConstants';
import * as SubscriptionAction from '../constants/SubscriptionConstants';
import { parseRSSFeed, getPlaylistFeedUrl } from '../utils/playlists';

export const subscribeToPlaylist = playlistId => {
  return async (dispatch) => {
    dispatch({
      type: SubscriptionAction.SUBSCRIBE_TO_PLAYLIST,
      payload: playlistId
    });

    try {
      const feedData = await parseRSSFeed(getPlaylistFeedUrl(playlistId));
      dispatch({
        type: PlaylistAction.HYDRATE_PLAYLIST,
        payload: feedData.feed
      });
    } catch (err) {
      //TODO error handling
    }
  };
};

export const unsubscribeFromPlaylist = playlistId => ({
  type: SubscriptionAction.UNSUBSCRIBE_FROM_PLAYLIST,
  payload: playlistId
});
