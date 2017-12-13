import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import PlaylistContainer from './components/PlaylistContainer/PlaylistContainer';
import SubscriptionButtonContainer from './components/SubscriptionButtonContainer/SubscriptionButtonContainer';

export const COMPONENT_TYPE = {
  PLAYLIST_CONTAINER: 'PLAYLIST_CONTAINER',
  SUBSCRIPTION_BUTTON: 'SUBSCRIPTION_BUTTON',
  PROMINENT_SUBSCRIPTION_BUTTON: 'PROMINENT_SUBSCRIPTION_BUTTON'
};

export default class AppRoot extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    type: PropTypes.oneOf(Object.values(COMPONENT_TYPE)).isRequired
  };

  render() {
    console.debug('rendering AppRoot');
    const { store, type, ...rest } = this.props;
    let app;

    switch(type) {
      case COMPONENT_TYPE.PLAYLIST_CONTAINER:
      default:
        app = <PlaylistContainer {...rest} />;
        break;
      case COMPONENT_TYPE.SUBSCRIPTION_BUTTON:
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
