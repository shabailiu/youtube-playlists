import React, { Component } from 'react';
import './LoadingIcon.less';

// Taken from: http://tobiasahlin.com/spinkit/
export class LoadingIcon extends Component {
  render() {
    return (
      <div className="yt-playlists-loading-icon">
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />
        <div className="bounce4" />
      </div>
    );
  }
}

export default LoadingIcon;