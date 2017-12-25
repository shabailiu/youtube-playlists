import * as SubscriptionAction from '../constants/SubscriptionConstants';
import { readFeedAndHydratePlaylist } from './PlaylistActions';
import { getPlaylistFeedUrl } from '../utils/playlists';

export const subscribeToPlaylist = (playlistId, feedData = {}) => readFeedAndHydratePlaylist(getPlaylistFeedUrl(playlistId), feedData);

export const unsubscribeFromPlaylist = playlistId => ({
  type: SubscriptionAction.UNSUBSCRIBE_FROM_PLAYLIST,
  payload: playlistId
});

export const aliases = {};