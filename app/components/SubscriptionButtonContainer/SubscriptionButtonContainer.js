import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import SubscriptionButton from './SubscriptionButton/SubscriptionButton';
import { isSubscribedPlaylist } from '../../utils/playlists';
import * as SubscriptionActions from '../../actions/SubscriptionActions';
import { playlistShape } from '../../constants/PropTypeValidation';

export class SubscriptionButtonContainer extends Component {
  static propTypes = {
    playlists: PropTypes.objectOf(PropTypes.shape(playlistShape)).isRequired,

    // Passed in props
    playlistId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.boundSubscriptionActions = bindActionCreators(SubscriptionActions, dispatch);
  }

  render() {
    const { playlists, playlistId } = this.props;

    return (
      <SubscriptionButton
        isSubscribed={isSubscribedPlaylist(playlistId, playlists)}
        playlistId={playlistId}
        {...this.boundSubscriptionActions}
      />
    );
  }
}

const mapStateToProps = state => ({
  playlists: state.playlists
});

export default connect(mapStateToProps)(SubscriptionButtonContainer);
