import * as SubscriptionAction from '../constants/SubscriptionConstants';
import { readFeedAndHydratePlaylist } from './PlaylistActions';
import { getPlaylistFeedUrl } from '../utils/playlists';

export const subscribeToPlaylist = playlistId => {
  return async (dispatch) => {
    dispatch({
      type: SubscriptionAction.SUBSCRIBE_TO_PLAYLIST,
      payload: playlistId
    });

    dispatch(readFeedAndHydratePlaylist(getPlaylistFeedUrl(playlistId)));
  };
};

export const unsubscribeFromPlaylist = playlistId => ({
  type: SubscriptionAction.UNSUBSCRIBE_FROM_PLAYLIST,
  payload: playlistId
});
