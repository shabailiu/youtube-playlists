import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export class ConfigContainer extends Component {
  static propTypes = {

  };

  click = () => {
    this.props.dispatch({
      type: 'TESTING'
    });
  };

  render() {
    return (
      <button onClick={this.click}>dispatch</button>
    );
  }
}

export default connect()(ConfigContainer);