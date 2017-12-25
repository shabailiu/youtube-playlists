import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List, {
  ListSubheader,
} from 'material-ui/List';
import { playlistShape } from '../../../constants/PropTypeValidation';
import AddPlaylist from './AddPlaylist/AddPlaylist';
import PlaylistListItem from './PlaylistListItem/PlaylistListItem';

export class ManageSubscriptions extends Component {
  static propTypes = {
    playlists: PropTypes.objectOf(PropTypes.shape(playlistShape))
  };

  renderSubs = () => {
    const { playlists } = this.props;
    const subs = [];

    Object.keys(playlists).forEach(playlistId => {
      subs.push(
        <PlaylistListItem
          key={playlistId}
          playlistDetails={playlists[playlistId]}
          playlistId={playlistId}
        />
      );
    });

    return subs;
  };

  render() {
    const { playlists } = this.props;

    return (
      <div>
        <AddPlaylist />
        <List subheader={<ListSubheader>Subscriptions ({ Object.keys(playlists).length })</ListSubheader>}>
          {this.renderSubs()}
        </List>
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