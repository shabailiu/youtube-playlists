import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SubscriptionButton extends Component {
  static propTypes = {};

  render() {
    const { isSubscribed } = this.props;
    let button;

    if (isSubscribed) {
      button = <button>Subscribed</button>
    } else {
      button = <button>Subscribe</button>
    }

    return (
      <div className="yt-playlists-sub-btn">
        {button}
      </div>
    );
  }
}

export default SubscriptionButton;