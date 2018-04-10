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
      <div className="ytp-VideoPlaylistTitle">{this.props.title}</div>
    );
  }
}

export default VideoPlaylistTitle;