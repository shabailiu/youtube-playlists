import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import SubscriptionButton from '../components/SubscriptionButton/SubscriptionButton';
import { isSubscribedPlaylist } from '../utils/playlists';

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
  url: PropTypes.string.isRequired,
  videos: PropTypes.arrayOf(videoShape)
};

export class SubscriptionButtonContainer extends Component {
  static propTypes = {
    playlists: PropTypes.objectOf(() => playlistShape).isRequired,

    // Passed in props
    playlistId: PropTypes.string.isRequired
  };

  render() {
    const { playlists, playlistId } = this.props;

    return (
      <SubscriptionButton isSubscribed={isSubscribedPlaylist(playlistId, playlists)} />
    );
  }
}

const mapStateToProps = state => ({
  playlists: state.playlists
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionButtonContainer);
