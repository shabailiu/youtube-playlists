import { combineReducers } from 'redux';
import playlists from './PlaylistReducer';
import app from './AppReducer';

export default combineReducers({
  playlists,
  app
});
