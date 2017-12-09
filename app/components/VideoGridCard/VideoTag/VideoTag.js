import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class VideoTag extends Component {
  static propTypes = {
    badges: PropTypes.arrayOf(PropTypes.string)
  };

  render() {
    const { badges } = this.props;
    const badgeArr = [];

    badges.forEach(badge => {
      badgeArr.push(
        <li className="yt-badge-item">
          <span className="yt-badge">{badge}</span>
        </li>
      );
    });

    return (
      <div className="yt-lockup-badges">
        <ul className="yt-badge-list">
          {badgeArr}
        </ul>
      </div>
    );
  }
}

export default VideoTag;