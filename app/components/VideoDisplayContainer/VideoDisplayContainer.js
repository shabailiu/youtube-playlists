import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import VideoDisplay from './VideoDisplay/VideoDisplay';
import VideoDisplayHeader from './VideoDisplayHeader/VideoDisplayHeader';
import { pickAllVideos } from '../../utils/playlists';
import { Collapse } from 'react-collapse';
import { filterVideos, FILTER_BY } from './VideoDisplay/VideoDisplayUtils';
import { playlistShape } from '../../constants/PropTypeValidation';

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

    // const loadingScreen = (
    //   <div className="yt-playlists-loading-screen">
    //     <LoadingIcon />
    //   </div>
    // );

    return (
      <div
        id="yt-playlists-video-list-wrapper"
        className="feed-item-container browse-list-item-container yt-section-hover-container compact-shelf shelf-item branded-page-box clearfix"
      >
        <div className="feed-item-dismissable">
          <VideoDisplayHeader />
          <Collapse isOpened={true}>
            <VideoDisplay
              videos={filteredVideos}
            />
          </Collapse>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  playlists: state.playlists,
  filterBy: state.app.filterBy,
  isFetching: state.app.isFetching
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(VideoDisplayContainer);