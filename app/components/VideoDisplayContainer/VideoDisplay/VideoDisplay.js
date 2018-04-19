import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import VideoGridCard from '../../VideoGridCard/VideoGridCard';
import { playlistShape, videoShape } from '../../../constants/PropTypeValidation';
import './VideoDisplay.less';

export class VideoDisplay extends Component {
  static propTypes = {
    playlists: PropTypes.objectOf(PropTypes.shape(playlistShape)).isRequired,

    // Passed in props
    videos: PropTypes.arrayOf(PropTypes.shape(videoShape))
  };

  static defaultProps = {
    videos: []
  };

  render() {
    const { playlists, videos } = this.props;
    const videoArr = [];

    if (isEmpty(videos)) {
      return <div>No videos</div>;
    }

    videos.forEach(video => {
      videoArr.push(
        <VideoGridCard
          key={video.videoId}
          playlistTitle={playlists[video.playlistId].title}
          {...video}
        />
      );
    });

    return (
      <div className="ytp-VideoDisplay">
        {videoArr}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  playlists: state.playlists
});

export default connect(mapStateToProps)(VideoDisplay);