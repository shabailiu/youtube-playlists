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
    const { isSubscribed } = this.props;
    let button;

    if (isSubscribed) {
      button = (
        <button
          className="subscribed yt-uix-button yt-uix-button-size-default yt-uix-button-subscribe-branded yt-uix-button-has-icon no-icon-markup yt-uix-subscription-button yt-can-buffer"
          type="button"
          onClick={this.unsubscribe}
        >
          <span className="yt-uix-button-content">
            <span aria-label="Unsubscribe">
              Unsubscribe
            </span>
          </span>
        </button>
      );
    } else {
      button = (
        <button
          className="yt-uix-button yt-uix-button-size-default yt-uix-button-subscribe-branded yt-uix-button-has-icon no-icon-markup yt-uix-subscription-button yt-can-buffer"
          type="button"
          onClick={this.subscribe}
        >
          <span className="yt-uix-button-content">
            <span aria-label="Subscribe">
              Subscribe
            </span>
          </span>
        </button>
      );
    }

    return (
      <div className="yt-playlists-sub-btn">
        {button}
      </div>
    );
  }
}

export default SubscriptionButton;