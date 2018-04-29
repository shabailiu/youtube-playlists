import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SubscriptionButton.less';

export class SubscriptionButton extends Component {
  static propTypes = {
    isSubscribed: PropTypes.bool.isRequired,
    playlistId: PropTypes.string.isRequired,
    subscribeToPlaylist: PropTypes.func.isRequired,
    unsubscribeFromPlaylist: PropTypes.func.isRequired
  };

  static defaultProps = {
    isSubscribed: false
  };

  subscribe = () => {
    const { playlistId, subscribeToPlaylist } = this.props;
    subscribeToPlaylist(playlistId);
  };

  unsubscribe = () => {
    const { playlistId, unsubscribeFromPlaylist } = this.props;
    unsubscribeFromPlaylist(playlistId);
  };

  render() {
    const { isSubscribed, playlistId } = this.props;
    let button;

    if (isSubscribed) {
      button = (
        <button
          type="button"
          onClick={this.unsubscribe}
          data-playlistid={playlistId}
        >
          <span>
            Unsubscribe
          </span>
        </button>
      );
    } else {
      button = (
        <button
          type="button"
          onClick={this.subscribe}
          data-playlistid={playlistId}
        >
          <span>
            Subscribe
          </span>
        </button>
      );
    }

    return (
      <div className="ytp-SubscriptionButton">
        {button}
      </div>
    );
  }
}

export default SubscriptionButton;