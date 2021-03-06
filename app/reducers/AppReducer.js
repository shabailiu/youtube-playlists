import * as AppAction from '../actions/constants/AppActionConstants';
import { FILTER_BY } from '../constants/AppConstants';
import { HYDRATE_ALL_PLAYLISTS } from '../actions/constants/PlaylistActionConstants';

export default (state = {
  filterBy: FILTER_BY.LAST_3_DAYS,
  isFetching: false,
  isHydrated: false
}, action) => {
  switch (action.type) {
    case AppAction.FILTER_VIDEOS:
      return {
        ...state,
        filterBy: action.payload
      };
    case AppAction.FETCHING_PLAYLISTS:
      return {
        ...state,
        isFetching: action.payload
      };
    case HYDRATE_ALL_PLAYLISTS:
      return {
        ...state,
        isHydrated: true
      };
    default:
      return state;
  }
}