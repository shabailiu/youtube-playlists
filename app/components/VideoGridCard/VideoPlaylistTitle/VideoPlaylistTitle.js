import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './VideoPlaylistTitle.less';

export class VideoPlaylistTitle extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  static defaultProps = {
    title: null
  };

  render() {
    return (
      <span className="yt-badge standalone-collection-badge-renderer-icon">{this.props.title}</span>
    );
  }
}

export default VideoPlaylistTitle;