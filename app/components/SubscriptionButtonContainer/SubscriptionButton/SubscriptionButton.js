import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
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
        <Button
          className="ytp-SubscriptionButton-unsubscribe"
          size="small"
          variant="raised"
          onClick={this.unsubscribe}
        >
          <span>
            Subscribed
          </span>
        </Button>
      );
    } else {
      button = (
        <Button
          className="ytp-SubscriptionButton-subscribe"
          size="small"
          variant="raised"
          onClick={this.subscribe}
        >
          <span>
            Subscribe
          </span>
        </Button>
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