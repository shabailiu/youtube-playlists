import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SubscriptionButton from './SubscriptionButton/SubscriptionButton';
import { isSubscribedPlaylist } from '../../utils/playlists';
import * as SubscriptionActions from '../../actions/SubscriptionActions';
import { playlistShape } from '../../constants/PropTypeValidation';

export class SubscriptionButtonContainer extends Component {
  static propTypes = {
    playlists: PropTypes.objectOf(PropTypes.shape(playlistShape)).isRequired,
    subscribeToPlaylist: PropTypes.func.isRequired,
    unsubscribeFromPlaylist: PropTypes.func.isRequired,

    // Passed in props
    playlistId: PropTypes.string.isRequired
  };

  handleSubscribeToPlaylist = playlistId => {
    const { subscribeToPlaylist } = this.props;
    subscribeToPlaylist(playlistId);
  };

  handleUnsubscribeFromPlaylist = playlistId => {
    const { unsubscribeFromPlaylist } = this.props;
    unsubscribeFromPlaylist(playlistId);
  };

  render() {
    const { playlists, playlistId } = this.props;

    return (
      <SubscriptionButton
        isSubscribed={isSubscribedPlaylist(playlistId, playlists)}
        playlistId={playlistId}
        subscribeToPlaylist={this.handleSubscribeToPlaylist}
        unsubscribeFromPlaylist={this.handleUnsubscribeFromPlaylist}
      />
    );
  }
}

const mapStateToProps = state => ({
  playlists: state.playlists
});

const mapDispatchToProps = dispatch => ({
  subscribeToPlaylist(playlistId) {
    dispatch(SubscriptionActions.subscribeToPlaylist(playlistId));
  },
  unsubscribeFromPlaylist(playlistId) {
    dispatch(SubscriptionActions.unsubscribeFromPlaylist(playlistId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionButtonContainer);
