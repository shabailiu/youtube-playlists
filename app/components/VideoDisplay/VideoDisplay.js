import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import VideoGridCard from '../VideoGridCard/VideoGridCard';
import { videoShape } from '../../constants/PropTypeValidation';
import { filterVideos, FILTER_BY } from './VideoDisplayUtils';
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import './VideoDisplay.less';

export class VideoDisplay extends Component {
  static propTypes = {
    filterBy: PropTypes.oneOf(Object.values(FILTER_BY)),
    isFetching: PropTypes.bool,
    videos: PropTypes.arrayOf(PropTypes.shape(videoShape))
  };

  static defaultProps = {
    filterBy: FILTER_BY.DEFAULT,
    isFetching: false,
    videos: []
  };

  render() {
    const { videos, filterBy, isFetching } = this.props;
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

    const loadingScreen = (
      <div className="yt-playlists-loading-screen">
        <LoadingIcon />
      </div>
    );

    return (
      <div className="multirow-shelf">
        {isFetching && loadingScreen}
        {!isFetching && <ul className="shelf-content">{videoArr}</ul>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filterBy: state.app.filterBy,
  isFetching: state.app.isFetching
});

export default connect(mapStateToProps)(VideoDisplay);