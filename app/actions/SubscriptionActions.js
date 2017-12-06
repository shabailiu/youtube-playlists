import * as action from '../constants/SubscriptionConstants';

export const subscribeToPlaylist = playlistId => ({
  type: action.SUBSCRIBE_TO_PLAYLIST,
  payload: playlistId
});

export const unsubscribeFromPlaylist = playlistId => ({
  type: action.UNSUBSCRIBE_FROM_PLAYLIST,
  payload: playlistId
});
