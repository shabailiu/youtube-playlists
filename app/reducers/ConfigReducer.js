import * as PlaylistAction from '../constants/PlaylistConstants';

export default (state = {}, action) => {
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