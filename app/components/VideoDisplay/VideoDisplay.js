import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VideoGridCard from '../VideoGridCard/VideoGridCard';
import { videoShape } from '../../constants/PropTypeValidation';

export class VideoDisplay extends Component {
  static propTypes = {
    videos: PropTypes.arrayOf(PropTypes.shape(videoShape))
  };

  render() {
    const { videos } = this.props;
    const videoArr = [];

    if (!videos) {
      return <div>No videos</div>;
    }

    videos.forEach(video => {
      videoArr.push(
        <li className="yt-shelf-grid-item">
          <VideoGridCard {...video} />
        </li>
      );
    });

    return <ul className="shelf-content">{videoArr}</ul>
  }
}

export default VideoDisplay;