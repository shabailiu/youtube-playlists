import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
import ConfigContainer from './components/ConfigContainer/ConfigContainer';
import { playlistShape } from './constants/PropTypeValidation';
import { readFeedAndHydrateAllPlaylists } from './actions/PlaylistActions';

export class ConfigRoot extends Component {
  static propTypes = {
    hydrateAllPlaylists: PropTypes.func.isRequired,
    isHydrated: PropTypes.bool,
    playlists: PropTypes.objectOf(PropTypes.shape(playlistShape)).isRequired,

    // Passed in props
    store: PropTypes.object.isRequired
  };

  static defaultProps = {
    isHydrated: false
  };

  componentWillMount() {
    const { hydrateAllPlaylists, isHydrated, playlists } = this.props;

    // Only hydrate if state is empty
    if (!isHydrated) {
      const feedUrls = Object.values(playlists).map(playlist => playlist.feedUrl);
      hydrateAllPlaylists(feedUrls);
    }
  }

  render() {
    console.debug('[ytp] rendering ConfigRoot');
    const { store } = this.props;

    return (
      <Provider store={store}>
        <ConfigContainer />
      </Provider>
    );
  }
}

const mapStateToProps = state => ({
  isHydrated: state.app.isHydrated,
  playlists: state.playlists
});

const mapDispatchToProps = dispatch => ({
  hydrateAllPlaylists(feedUrls) {
    dispatch(readFeedAndHydrateAllPlaylists(feedUrls));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfigRoot);