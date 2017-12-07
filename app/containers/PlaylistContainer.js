import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import VideoDisplay from '../components/VideoDisplay/VideoDisplay';
import './PlaylistContainer.less';
import { playlistShape } from '../constants/PropTypeValidation';
import { readFeedAndHydrateAllPlaylists } from '../actions/PlaylistActions';

export class PlaylistContainer extends Component {
  static propTypes = {
    hydrateAllPlaylists: PropTypes.func.isRequired,

    // Passed in props
    playlists: PropTypes.objectOf(PropTypes.shape(playlistShape)).isRequired
  };

  componentWillMount() {
    const { hydrateAllPlaylists, playlists } = this.props;
    const feedUrls = Object.values(playlists).map(playlist => playlist.feedUrl);
    hydrateAllPlaylists(feedUrls);
  }

  render() {
    const { playlists } = this.props;
    const videos = Object.values(playlists).map(playlist => playlist.videos).reduce((acc, curr) => acc && acc.concat(curr));
console.log('videos', videos);
    return (
      <div>
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
  hydrateAllPlaylists(feedUrls) {
    dispatch(readFeedAndHydrateAllPlaylists(feedUrls));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistContainer);
