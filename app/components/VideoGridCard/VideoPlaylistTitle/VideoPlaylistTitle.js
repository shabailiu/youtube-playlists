import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class VideoPlaylistTitle extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  render() {
    return (
      <span className="yt-badge standalone-collection-badge-renderer-icon">{this.props.title}</span>
    );
  }
}

export default VideoPlaylistTitle;