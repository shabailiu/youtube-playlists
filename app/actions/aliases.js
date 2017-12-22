import * as PlaylistActions from './PlaylistActions';

export const READ_FEED_AND_HYDRATE_ALL_PLAYLISTS = 'READ_FEED_AND_HYDRATE_ALL_PLAYLISTS';

export const readFeedAndHydrateAllPlaylistsAlias = feedUrls => ({
  type: READ_FEED_AND_HYDRATE_ALL_PLAYLISTS,
  payload: feedUrls
});

export default {
  [READ_FEED_AND_HYDRATE_ALL_PLAYLISTS]: PlaylistActions.readFeedAndHydrateAllPlaylists
};