import { combineReducers } from 'redux';
import playlists from './PlaylistReducer';
import config from './ConfigReducer';

export default combineReducers({
  playlists,
  config
});
