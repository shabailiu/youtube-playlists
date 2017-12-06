import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import PlaylistContainer from './PlaylistContainer';
import SubscriptionButton from './SubscriptionButton';

export const TYPE = {
  PLAYLIST_CONTAINER: 'PLAYLIST_CONTAINER',
  SUBSCRIPTION_BUTTON: 'SUBSCRIPTION_BUTTON'
};

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { store, type, ...rest } = this.props;
    let app;

    switch(type) {
      case TYPE.PLAYLIST_CONTAINER:
      default:
        app = <PlaylistContainer {...rest} />;
        break;
      case TYPE.SUBSCRIPTION_BUTTON:
        app = <SubscriptionButton {...rest} />;
        break;
    }

    return (
      <Provider store={store}>
        {app}
      </Provider>
    );
  }
}
