import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import ConfigContainer from './components/ConfigContainer/ConfigContainer';

export default class ConfigRoot extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    console.debug('rendering ConfigRoot');
    const { store } = this.props;

    return (
      <Provider store={store}>
        <ConfigContainer />
      </Provider>
    );
  }
}
