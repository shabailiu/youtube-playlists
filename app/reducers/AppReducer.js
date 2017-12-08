import * as AppAction from '../constants/AppConstants';
import { FILTER_BY } from '../components/VideoDisplay/VideoDisplayUtils';

export default (state = {
  filterBy: FILTER_BY.DEFAULT,
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