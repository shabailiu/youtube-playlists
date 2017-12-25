import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { playlistShape } from '../../../../constants/PropTypeValidation';
import List, {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
} from 'material-ui/List';
import LinkIcon from 'material-ui-icons/Link';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import get from 'lodash/get';
import './PlaylistListItem.less';

export class PlaylistListItem extends Component {
  static propTypes = {
    playlistDetails: PropTypes.shape(playlistShape)
  };

  render() {
    const {
      authorName,
      authorUrl,
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
          <IconButton>
            <LinkIcon />
          </IconButton>
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default PlaylistListItem;