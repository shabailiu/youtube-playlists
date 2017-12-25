import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { playlistShape } from '../../../../constants/PropTypeValidation';
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import LinkIcon from 'material-ui-icons/Link';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import get from 'lodash/get';
import { unsubscribeFromPlaylist } from '../../../../actions/SubscriptionActions';
import './PlaylistListItem.less';

export class PlaylistListItem extends Component {
  static propTypes = {
    playlistDetails: PropTypes.shape(playlistShape),
    playlistId: PropTypes.string.isRequired,
    unsubscribeFromPlaylist: PropTypes.func.isRequired
  };

  handleOnUnsubscribe = () => {
    const { playlistId, unsubscribeFromPlaylist } = this.props;
    unsubscribeFromPlaylist(playlistId);
  };

  render() {
    const {
      authorName,
      playlistUrl,
      title,
      videos
    } = this.props.playlistDetails;

    const playlistThumbnail = get(videos, '[0].thumbnailImg');

    return (
      <ListItem
        className="PlaylistListItem"
      >
        <div className="PlaylistListItem-thumbnail">
          {playlistThumbnail && <img src={playlistThumbnail} />}
        </div>
        <ListItemText
          primary={title}
          secondary={authorName}
        />
        <ListItemSecondaryAction>
          <a href={playlistUrl} target="_blank">
            <IconButton>
              <LinkIcon />
            </IconButton>
          </a>
          <IconButton aria-label="Delete" onClick={this.handleOnUnsubscribe}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  unsubscribeFromPlaylist(playlistId) {
    dispatch(unsubscribeFromPlaylist(playlistId));
  }
});

export default connect(() => ({}), mapDispatchToProps)(PlaylistListItem);