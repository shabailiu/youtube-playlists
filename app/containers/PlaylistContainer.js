import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import VideoDisplay from '../components/VideoDisplay/VideoDisplay';
import _ from 'lodash';
import './PlaylistContainer.less';
import { playlistShape } from '../constants/PropTypeValidation';

export class PlaylistContainer extends Component {

  static propTypes = {
    playlists: PropTypes.objectOf(playlistShape).isRequired
  };

  render() {
    const { playlists } = this.props;
    const videos = Object.values(playlists).map(playlist => playlist.videos).reduce((acc, curr) => acc && acc.concat(curr));

    return (
      <div>
        <h1>hiasdf</h1>
        {videos && (
          <VideoDisplay
            videos={videos}
          />
        )}
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
