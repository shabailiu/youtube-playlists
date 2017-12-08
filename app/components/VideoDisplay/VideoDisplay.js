import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import VideoGridCard from '../VideoGridCard/VideoGridCard';
import { videoShape } from '../../constants/PropTypeValidation';
import { filterVideos, FILTER_BY } from './VideoDisplayUtils';

export class VideoDisplay extends Component {
  static propTypes = {
    filterBy: PropTypes.oneOf(Object.values(FILTER_BY)),
    videos: PropTypes.arrayOf(PropTypes.shape(videoShape))
  };

  static defaultProps = {
    filterBy: FILTER_BY.DEFAULT,
    videos: []
  };

  render() {
    const { videos, filterBy } = this.props;
    const filteredVideos = filterVideos(videos, 12, filterBy);
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

const mapStateToProps = state => ({
  filterBy: state.config.filterBy
});

export default connect(mapStateToProps)(VideoDisplay);