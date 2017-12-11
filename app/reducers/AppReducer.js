import * as AppAction from '../constants/AppConstants';
import { FILTER_BY } from '../components/VideoDisplayContainer/VideoDisplay/VideoDisplayUtils';

export default (state = {
  filterBy: FILTER_BY.LAST_3_DAYS,
  isFetching: false
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
    default:
      return state;
  }
}