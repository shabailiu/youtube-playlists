import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PlaylistContainer from '../components/VideoDisplay/VideoDisplay';
import _ from 'lodash';

const playlistShape = () => ({
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  videos: PropTypes.arrayOf(videoShape)
});

export class SubscriptionButton extends Component {

  static propTypes = {
    playlistId: PropTypes.string.isRequired,
    playlists: playlistShape.isRequired
  };

  render() {
    const { playlists } = this.props;

    return (
      <div>
        <h1>Subscribe</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  playlists: state.playlists
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionButton);
