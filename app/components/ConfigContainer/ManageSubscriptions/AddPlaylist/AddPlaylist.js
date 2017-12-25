import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input from 'material-ui/Input';
import { subscribeToPlaylist } from '../../../../actions/SubscriptionActions';
import { parseRSSFeed, getPlaylistFeedUrl } from '../../../../utils/playlists';
import './AddPlaylist.less';

const extractPlaylistId = input => {
  const match = input.match(/^http[s]?:\/\/www\.youtube\.com\/playlist\?.*list=([^&\s]+)/);
  return (match && match[1]) || input;
};

export class AddPlaylist extends Component {
  static propTypes = {};

  constructor() {
    super();

    this.state = {
      errMsg: '',
      hasError: false,
      value: ''
    };
  }

  handleOnChange = event => {
    this.setState({
      value: event.target.value
    });
  };

  handleAddPlaylist = event => {
    event.preventDefault();
    const { addPlaylist, playlists } = this.props;
    const formData = new FormData(event.target);
    const playlistId = extractPlaylistId(formData.get('add-playlist'));

    // Check if the playlist already exists
    if (playlists[playlistId]) {
      return this.setState({
        hasError: true,
        errMsg: `You're already subscribed to this one! (${playlists[playlistId].title} - ${playlists[playlistId].authorName})`
      });
    }

    // Check if the playlist exists
    parseRSSFeed(getPlaylistFeedUrl(playlistId)).then(
      feedData => {
        addPlaylist(playlistId, feedData);

        this.setState({
          hasError: false,
          value: ''
        });
      }
    ).catch(
      err => this.setState({
        hasError: true,
        errMsg: `Couldn't find a playlist with ID (${playlistId})`
      })
    );
  };

  render() {
    const { errMsg, hasError, value } = this.state;

    return (
      <div id="add-playlist-wrapper">
        <form onSubmit={this.handleAddPlaylist}>
          <FormControl
            fullWidth
            error={hasError}
          >
            <Paper>
              <Input
                id="add-playlist"
                name="add-playlist"
                placeholder="Add a playlist..."
                onChange={this.handleOnChange}
                value={value}
                fullWidth
              />
            </Paper>
            <FormHelperText>
              {hasError ? errMsg : 'Enter a playlist ID or URL'}
            </FormHelperText>
          </FormControl>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  playlists: state.playlists
});

const mapDispatchToProps = dispatch => ({
  addPlaylist(playlistId, feedData) {
    dispatch(subscribeToPlaylist(playlistId, feedData));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPlaylist);