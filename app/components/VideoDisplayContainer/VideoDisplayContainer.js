import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import VideoDisplay from './VideoDisplay/VideoDisplay';
import VideoDisplayHeader from './VideoDisplayHeader/VideoDisplayHeader';
import { pickAllVideos } from '../../utils/playlists';
import { Collapse } from 'react-collapse';
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

  constructor() {
    super();

    this.state = {
      height: 0
    };
  }

  componentDidMount() {
    // TODO: This is kinda hacky - this animates the initial render, but is very slow
    setTimeout(() => {
      this.setState({
        height: this.ref.clientHeight
      });
    }, 100);

    setTimeout(() => {
      this.setState({
        height: 'auto'
      });
    }, 600);
  }

  setRef = ref => {
    this.ref = ref;
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
        style={{ height: this.state.height }}
        ref={this.setRef}
      >
        <VideoDisplayHeader />
        {isFetching ? loadingScreen : (
          <Collapse isOpened={true}>
            <VideoDisplay
              videos={filteredVideos}
            />
          </Collapse>
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

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(VideoDisplayContainer);