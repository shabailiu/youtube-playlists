import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List, {
  ListSubheader,
} from 'material-ui/List';
import { playlistShape } from '../../../constants/PropTypeValidation';
import Paper from 'material-ui/Paper';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input from 'material-ui/Input';
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
        <div id="add-playlist-wrapper">
          <FormControl fullWidth>
            <Paper>
              <Input
                id="add-playlist"
                placeholder="Add a playlist..."
                fullWidth
              />
            </Paper>
            <FormHelperText>
              Enter a playlist ID or URL
            </FormHelperText>
          </FormControl>
        </div>
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