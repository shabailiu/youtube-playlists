import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import VideoDisplay from './VideoDisplay/VideoDisplay';
import VideoDisplayHeader from './VideoDisplayHeader/VideoDisplayHeader';
import { pickAllVideos } from '../../utils/playlists';
import { filterVideos } from './VideoDisplay/VideoDisplayUtils';
import { playlistShape } from '../../constants/PropTypeValidation';
import './VideoDisplayContainer.less';
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import { FILTER_BY } from '../../constants/AppConstants';

export class VideoDisplayContainer extends Component {
  static propTypes = {
    filterBy: PropTypes.oneOf(Object.values(FILTER_BY)),
    isFetching: PropTypes.bool,
    playlists: PropTypes.objectOf(PropTypes.shape(playlistShape)).isRequired
  };

  render() {
    const { playlists, filterBy, isFetching } = this.props;
    const videos = pickAllVideos(playlists);
    const filteredVideos = filterVideos(videos, 12, filterBy);

    const loadingScreen = (
      <div className="ytp-VideoDisplayContainer-loading">
        <LoadingIcon />
      </div>
    );

    return (
      <div
        className="ytp-VideoDisplayContainer"
      >
        <VideoDisplayHeader />
        {isFetching ? loadingScreen : (
          <VideoDisplay
            videos={filteredVideos}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  playlists: state.playlists,
  filterBy: state.app.filterBy,
  isFetching: state.app.isFetching
});

export default connect(mapStateToProps)(VideoDisplayContainer);