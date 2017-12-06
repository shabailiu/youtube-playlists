import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import VideoDisplay from '../components/VideoDisplay/VideoDisplay';
import _ from 'lodash';
import './PlaylistContainer.less';

const videoShape = {
  videoTitle: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
  thumbnailImg: PropTypes.string.isRequired,
  channelName: PropTypes.string.isRequired,
  channelUrl: PropTypes.string.isRequired,
  views: PropTypes.number.isRequired,
  timestamp: PropTypes.string.isRequired
};

const playlistShape = {
  id: PropTypes.string.isRequired,
  feedUrl: PropTypes.string.isRequired,
  playlistUrl: PropTypes.string.isRequired,
  videos: PropTypes.arrayOf(videoShape)
};

export class PlaylistContainer extends Component {

  static propTypes = {
    playlists: PropTypes.objectOf(playlistShape).isRequired
  };

  render() {
    const { playlists } = this.props;
    const videos = playlists.map(playlist => playlist.videos).reduce((acc, curr) => acc.concat(curr));

    return (
      <div>
        <h1>hiasdf</h1>
        <VideoDisplay
          videos={videos}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  playlists: state.playlists
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistContainer);
