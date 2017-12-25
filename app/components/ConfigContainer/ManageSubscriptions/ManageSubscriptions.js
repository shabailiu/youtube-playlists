import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import List, {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
} from 'material-ui/List';
import { playlistShape } from '../../../constants/PropTypeValidation';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input from 'material-ui/Input';

export class ManageSubscriptions extends Component {
  static propTypes = {
    playlists: PropTypes.objectOf(PropTypes.shape(playlistShape))
  };

  renderSubs = () => {
    const { playlists } = this.props;
    const subs = [];

    Object.keys(playlists).forEach(playlistId => {
      subs.push(
        <ListItem key={playlistId}>
          <ListItemText primary="Wi-Fis" />
          <ListItemSecondaryAction>
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });

    return subs;
  };

  render() {
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
        <List subheader={<ListSubheader>Subscriptions</ListSubheader>}>
          {this.renderSubs()}
        </List>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  playlists: state.playlists
});

export default connect(mapStateToProps)(ManageSubscriptions);