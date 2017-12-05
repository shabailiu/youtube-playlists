import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './App.less';

export class App extends Component {

  static propTypes = {
  };

  render() {
    const { } = this.props;

    return (
      <div>
        <h1>helloasdf</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(App);
