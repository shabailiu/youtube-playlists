import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import VideoGridCard from '../VideoGridCard/VideoGridCard';
import { videoShape } from '../../constants/PropTypeValidation';
import { filterVideos, FILTER_BY } from './VideoDisplayUtils';

export class VideoDisplay extends Component {
  static propTypes = {
    videos: PropTypes.arrayOf(PropTypes.shape(videoShape))
  };

  render() {
    const { videos } = this.props;
    const filteredVideos = filterVideos(videos, 12, FILTER_BY.LAST_YEAR);
    const videoArr = [];

    if (isEmpty(filteredVideos)) {
      return <div>No videos</div>;
    }

    filteredVideos.forEach(video => {
      videoArr.push(
        <li
          key={video.videoId}
          className="yt-shelf-grid-item"
        >
          <VideoGridCard {...video} />
        </li>
      );
    });

    return (
      <div className="multirow-shelf">
        <ul className="shelf-content">{videoArr}</ul>
      </div>
    );
  }
}

export default VideoDisplay;