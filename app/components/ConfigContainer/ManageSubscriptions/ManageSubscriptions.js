import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List, {
  ListSubheader,
} from 'material-ui/List';
import { playlistShape } from '../../../constants/PropTypeValidation';
import AddPlaylist from './AddPlaylist/AddPlaylist';
import PlaylistListItem from './PlaylistListItem/PlaylistListItem';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

export class ManageSubscriptions extends Component {
  static propTypes = {
    playlists: PropTypes.objectOf(PropTypes.shape(playlistShape))
  };

  constructor() {
    super();

    this.state = {
      snackBarOpen: false,
      snackBarMessage: ''
    };
  }

  handleSubscriptionAdded = (playlistId, playlistDetails) => {
    this.setState({
      snackBarOpen: true,
      snackBarMessage: `Subscribed to ${playlistDetails.title}`
    });
  };

  handleSubscriptionRemoved = (playlistId, playlistDetails) => {
    this.setState({
      snackBarOpen: true,
      snackBarMessage: `Unsubscribed from ${playlistDetails.title}`
    });
  };

  handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ snackBarOpen: false });
  };

  renderSubs = () => {
    const { playlists } = this.props;
    const subs = [];

    Object.keys(playlists).forEach(playlistId => {
      subs.push(
        <PlaylistListItem
          key={playlistId}
          onSubscriptionRemoved={this.handleSubscriptionRemoved}
          playlistDetails={playlists[playlistId]}
          playlistId={playlistId}
        />
      );
    });

    return subs;
  };

  render() {
    const { playlists } = this.props;
    const { snackBarOpen, snackBarMessage } = this.state;

    return (
      <div>
        <AddPlaylist onSubscriptionAdded={this.handleSubscriptionAdded} />
        <List subheader={<ListSubheader>Subscriptions ({ Object.keys(playlists).length })</ListSubheader>}>
          {this.renderSubs()}
        </List>

        <Snackbar
          open={snackBarOpen}
          autoHideDuration={3000}
          onClose={this.handleCloseSnackbar}
          message={snackBarMessage}
          action={[
            <Button key="undo" color="accent" dense onClick={this.handleCloseSnackbar}>
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleCloseSnackbar}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  playlists: state.playlists
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageSubscriptions);