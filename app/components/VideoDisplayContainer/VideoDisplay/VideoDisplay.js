import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import VideoGridCard from '../../VideoGridCard/VideoGridCard';
import { videoShape } from '../../../constants/PropTypeValidation';
import './VideoDisplay.less';

export class VideoDisplay extends Component {
  static propTypes = {
    videos: PropTypes.arrayOf(PropTypes.shape(videoShape))
  };

  static defaultProps = {
    videos: []
  };

  render() {
    const { videos } = this.props;
    const videoArr = [];

    if (isEmpty(videos)) {
      return <div>No videos</div>;
    }

    videos.forEach(video => {
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