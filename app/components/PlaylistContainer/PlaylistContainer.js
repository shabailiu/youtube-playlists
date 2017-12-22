import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import './PlaylistContainer.less';
import { playlistShape } from '../../constants/PropTypeValidation';
import { readFeedAndHydrateAllPlaylistsAlias } from '../../actions/aliases';
import VideoDisplayContainer from '../VideoDisplayContainer/VideoDisplayContainer';

export class PlaylistContainer extends Component {
  static propTypes = {
    hydrateAllPlaylists: PropTypes.func.isRequired,
    playlists: PropTypes.objectOf(PropTypes.shape(playlistShape)).isRequired
  };

  componentWillMount() {
    const { hydrateAllPlaylists, playlists } = this.props;
    const feedUrls = Object.values(playlists).map(playlist => playlist.feedUrl);
    hydrateAllPlaylists(feedUrls);
  }

  render() {
    return (
      <ol className="item-section">
        <li>
          <VideoDisplayContainer />
        </li>
      </ol>
    );
  }
}

const mapStateToProps = state => ({
  playlists: state.playlists
});

const mapDispatchToProps = dispatch => ({
  hydrateAllPlaylists(feedUrls) {
    dispatch(readFeedAndHydrateAllPlaylistsAlias(feedUrls));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistContainer);
