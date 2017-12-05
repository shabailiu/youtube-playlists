import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VideoCard from '../VideoCard/VideoCard';

export class PlaylistContainer extends Component {
  static propTypes = {};

  render() {
    const { videos } = this.props;
    const videoArr = [];

    videos.forEach(video => {
      videoArr.push(
        <li className="yt-shelf-grid-item">
          <VideoCard />
        </li>
      );
    });

    return <ul className="shelf-content">{videoArr}</ul>
  }
}

export default PlaylistContainer;