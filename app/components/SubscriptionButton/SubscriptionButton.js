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

  renderButton = () => {
    return (
      <button
        className="yt-uix-button yt-uix-button-size-default yt-uix-button-subscribe-branded yt-uix-button-has-icon no-icon-markup yt-uix-subscription-button yt-can-buffer"
        type="button"
        onClick={this.subscribe}
      >
        <span className="yt-uix-button-content">
          <span
            className="subscribe-label"
            aria-label="Subscribe"
          >
            Subscribe
          </span>
        </span>
      </button>
    );
  };

  render() {
    const { isSubscribed } = this.props;
    let button;

    if (isSubscribed) {
      button = <button onClick={this.unsubscribe}>Subscribed</button>
    } else {
      button = <button onClick={this.subscribe}>Subscribe</button>
    }

    return (
      <div className="yt-playlists-sub-btn">
        {this.renderButton()}
      </div>
    );
  }
}

export default SubscriptionButton;