import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import PlaylistContainer from './components/PlaylistContainer/PlaylistContainer';
import SubscriptionButtonContainer from './components/SubscriptionButtonContainer/SubscriptionButtonContainer';

export const TYPE = {
  PLAYLIST_CONTAINER: 'PLAYLIST_CONTAINER',
  SUBSCRIPTION_BUTTON: 'SUBSCRIPTION_BUTTON'
};

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    type: PropTypes.oneOf(Object.values(TYPE)).isRequired
  };

  render() {
    console.debug('rendering Root');
    const { store, type, ...rest } = this.props;
    let app;

    switch(type) {
      case TYPE.PLAYLIST_CONTAINER:
      default:
        app = <PlaylistContainer {...rest} />;
        break;
      case TYPE.SUBSCRIPTION_BUTTON:
        app = <SubscriptionButtonContainer {...rest} />;
        break;
    }

    return (
      <Provider store={store}>
        {app}
      </Provider>
    );
  }
}
