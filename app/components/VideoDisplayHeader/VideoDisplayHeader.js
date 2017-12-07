import React, { Component } from 'react';

export class VideoDisplayHeader extends Component {
  render() {
    return (
      <div className="shelf-title-table">
        <div className="shelf-title-row">
          <h2 className="branded-page-module-title shelf-title-cell">
            <span className="branded-page-module-title-text">Playlists</span>
          </h2>
          <div className="menu-container shelf-title-cell">
            <div className="yt-uix-menu-container feed-item-action-menu">
              <ul className="yt-uix-menu-top-level-button-container">
                <li className="yt-uix-menu-top-level-button yt-uix-menu-top-level-flow-button">
                  <button
                    className="yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-empty yt-uix-button-has-icon yt-uix-tooltip"
                    type="button"
                    onClick={false}
                    aria-label="Switch to grid view"
                    title="Grid"
                    disabled="True"
                  >
                    <span className="yt-uix-button-icon-wrapper">
                      <span className="yt-uix-button-icon yt-uix-button-icon-view-module yt-sprite" />
                    </span>
                  </button>
                </li>
                <li className="yt-uix-menu-top-level-button yt-uix-menu-top-level-flow-button">
                  <a
                    href="/feed/subscriptions?flow=2"
                    className="yt-uix-button   yt-uix-sessionlink yt-uix-button-opacity yt-uix-button-size-default yt-uix-button-has-icon yt-uix-tooltip yt-uix-button-empty"
                    aria-label="Switch to list view"
                    title="List"
                  >
                    <span className="yt-uix-button-icon-wrapper">
                      <span className="yt-uix-button-icon yt-uix-button-icon-view-list yt-sprite" />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoDisplayHeader;
