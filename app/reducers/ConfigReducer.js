import * as PlaylistAction from '../constants/PlaylistConstants';
import { FILTER_BY } from '../components/VideoDisplay/VideoDisplayUtils';

export default (state = {
  filterBy: FILTER_BY.DEFAULT
}, action) => {
  switch (action.type) {
    case PlaylistAction.FILTER_VIDEOS:
      return {
        ...state,
        filterBy: action.payload
      };
    default:
      return state;
  }
}