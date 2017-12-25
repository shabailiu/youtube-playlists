import * as AppAction from './constants/AppActionConstants';

export const fetchingPlaylists = isFetching => ({
  type: AppAction.FETCHING_PLAYLISTS,
  payload: isFetching
});

export const filterVideos = filter => ({
  type: AppAction.FILTER_VIDEOS,
  payload: filter
});

export const aliases = {};