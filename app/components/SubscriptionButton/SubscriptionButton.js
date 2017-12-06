import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      button = <button onClick={this.unsubscribe}>Subscribed</button>
    } else {
      button = <button onClick={this.subscribe}>Subscribe</button>
    }

    return (
      <div className="yt-playlists-sub-btn">
        {button}
      </div>
    );
  }
}

export default SubscriptionButton;