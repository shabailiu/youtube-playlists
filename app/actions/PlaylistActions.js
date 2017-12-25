import * as PlaylistAction from '../constants/PlaylistConstants';
import { parseRSSFeed } from '../utils/playlists';
import { fetchingPlaylists } from './AppActions';

export const readFeedAndHydratePlaylist = (feedUrl, feedData = {}) => ({
  type: PlaylistAction.alias.READ_FEED_AND_HYDRATE_PLAYLIST,
  payload: {
    feedUrl,
    feedData
  }
});

const readFeedAndHydratePlaylistImpl = action => {
  let { feedUrl, feedData } = action.payload;
  return async (dispatch) => {
    if (!feedData) {
      try {
        feedData = await parseRSSFeed(feedUrl);
      } catch (err) {
        console.error('Error in readFeedAndHydratePlaylist:', err);
      }
    }

    dispatch(hydratePlaylist(feedData.feed));
  };
};

export const readFeedAndHydrateAllPlaylists = feedUrls => ({
  type: PlaylistAction.alias.READ_FEED_AND_HYDRATE_ALL_PLAYLISTS,
  payload: feedUrls
});

const readFeedAndHydrateAllPlaylistsImpl = action => {
  const feedUrls = action.payload;
  return async (dispatch) => {
    dispatch(fetchingPlaylists(true));

    try {
      const promises = [];
      feedUrls.forEach(feed => {
        promises.push(parseRSSFeed(feed));
      });
      Promise.all(promises).then(feedData => {
        dispatch(fetchingPlaylists(false));
        feedData = feedData.map(data => data.feed);
        dispatch(hydrateAllPlaylists(feedData));
      });
    } catch (err) {
      console.error('Error in readFeedAndHydrateAllPlaylists:', err);
    }
  };
};

export const hydratePlaylist = feedData => ({
  type: PlaylistAction.HYDRATE_PLAYLIST,
  payload: feedData
});

export const hydrateAllPlaylists = feedData => ({
  type: PlaylistAction.HYDRATE_ALL_PLAYLISTS,
  payload: feedData
});

export const aliases = {
  [PlaylistAction.alias.READ_FEED_AND_HYDRATE_PLAYLIST]: readFeedAndHydratePlaylistImpl,
  [PlaylistAction.alias.READ_FEED_AND_HYDRATE_ALL_PLAYLISTS]: readFeedAndHydrateAllPlaylistsImpl
};
