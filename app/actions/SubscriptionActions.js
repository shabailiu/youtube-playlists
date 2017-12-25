import * as SubscriptionAction from '../constants/SubscriptionConstants';
import { readFeedAndHydratePlaylist } from './PlaylistActions';
import { getPlaylistFeedUrl } from '../utils/playlists';

export const subscribeToPlaylist = playlistId => readFeedAndHydratePlaylist(getPlaylistFeedUrl(playlistId));

export const unsubscribeFromPlaylist = playlistId => ({
  type: SubscriptionAction.UNSUBSCRIBE_FROM_PLAYLIST,
  payload: playlistId
});

export const aliases = {};