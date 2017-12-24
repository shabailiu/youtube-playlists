import * as SubscriptionAction from '../constants/SubscriptionConstants';
import { readFeedAndHydratePlaylist } from './PlaylistActions';
import { getPlaylistFeedUrl } from '../utils/playlists';

export const subscribeToPlaylist = playlistId => ({
  type: SubscriptionAction.alias.SUBSCRIBE_TO_PLAYLIST,
  payload: playlistId
});

const subscribeToPlaylistImpl = action => {
  const playlistId = action.payload;
  return dispatch => {
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

export const aliases = {
  [SubscriptionAction.alias.SUBSCRIBE_TO_PLAYLIST]: subscribeToPlaylistImpl
};