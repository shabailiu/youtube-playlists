import * as PlaylistAction from '../constants/PlaylistConstants';
import { parseRSSFeed } from '../utils/playlists';

export const readFeedAndHydratePlaylist = feedUrl => {
  return async (dispatch) => {
    try {
      const feedData = await parseRSSFeed(feedUrl);
      dispatch(hydratePlaylist(feedData.feed));
    } catch (err) {
      //TODO error handling
    }
  };
};

export const readFeedAndHydrateAllPlaylists = feedUrls => {
  return async (dispatch) => {
    try {
      const promises = [];
      feedUrls.forEach(feed => {
        promises.push(parseRSSFeed(feed));
      });
      Promise.all(promises).then(feedData => {
        feedData = feedData.map(data => data.feed);
        dispatch(hydrateAllPlaylists(feedData));
      });
    } catch (err) {
      //TODO error handling
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

export const filterVideos = filter => ({
  type: PlaylistAction.FILTER_VIDEOS,
  payload: filter
});