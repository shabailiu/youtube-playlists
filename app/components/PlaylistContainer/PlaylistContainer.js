import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import './PlaylistContainer.less';
import { playlistShape } from '../../constants/PropTypeValidation';
import { readFeedAndHydrateAllPlaylists } from '../../actions/PlaylistActions';
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
      <div className="ytd-PlaylistContainer">
        <div className="style-scope ytd-section-list-renderer">
          <div className="style-scope ytd-item-section-renderer">
            <div className="style-scope ytd-shelf-renderer">
              <VideoDisplayContainer />
            </div>
          </div>
        </div>
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
