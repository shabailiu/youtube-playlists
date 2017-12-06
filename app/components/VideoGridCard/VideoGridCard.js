import React, { Component } from 'react';
import PropType from 'prop-types';

export class VideoGridCard extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="yt-lockup yt-lockup-grid yt-lockup-video clearfix">
        <div className="yt-lockup-dismissable">
          <div className="yt-lockup-thumbnail contains-addto">
            <a
              aria-hidden="true"
              href="/watch?v=Ym0Zi4VjF38"
              className=" yt-uix-sessionlink      spf-link "
            >
              <div className="yt-thumb video-thumb yt-uix-mouseover-img-wrap">
                <span className="yt-thumb-simple">
                  <img
                    width="196"
                    data-mouseover-log="True"
                    alt=""
                    data-ytimg="1"
                    height="110"
                    src="https://i.ytimg.com/vi/Ym0Zi4VjF38/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&amp;rs=AOn4CLDJIgfC_-TB3JK6W4w6XeOlX0aE_A"
                  />
                </span>
              </div>
            </a>
            <span className="thumb-menu dark-overflow-action-menu video-actions">
              <button
                className="yt-uix-button-reverse flip addto-watch-queue-menu spf-nolink hide-until-delayloaded yt-uix-button yt-uix-button-dark-overflow-action-menu yt-uix-button-size-default yt-uix-button-has-icon no-icon-markup yt-uix-button-empty"
                aria-haspopup="true"
                onclick=";return false;"
                type="button"
                aria-expanded="false"
              >
                <span className="yt-uix-button-arrow yt-sprite" />
                <ul
                  className="watch-queue-thumb-menu yt-uix-button-menu yt-uix-button-menu-dark-overflow-action-menu hid">
                  <li
                    role="menuitem"
                    className="overflow-menu-choice addto-watch-queue-menu-choice addto-watch-queue-play-next yt-uix-button-menu-item"
                    data-action="play-next"
                    onclick=";return false;"
                    data-video-ids="Ym0Zi4VjF38"
                  >
                    <span className="addto-watch-queue-menu-text">Play next</span>
                  </li>
                  <li
                    role="menuitem"
                    className="overflow-menu-choice addto-watch-queue-menu-choice addto-watch-queue-play-now yt-uix-button-menu-item"
                    data-action="play-now"
                    onclick=";return false;"
                    data-video-ids="Ym0Zi4VjF38"
                  >
                    <span className="addto-watch-queue-menu-text">Play now</span>
                  </li>
                </ul>
              </button>
            </span>
          </div>
          <div className="yt-lockup-content">
            <h3 className="yt-lockup-title contains-action-menu">
              <a
                href="/watch?v=Ym0Zi4VjF38"
                className=" yt-ui-ellipsis yt-ui-ellipsis-2 yt-uix-sessionlink      spf-link "
                data-sessionlink="itct=CHcQlDUYBCITCPCOlonL89cCFci1fgod4egLqSjpHjIJYXRvbS1zdWJzWg9GRXN1YnNjcmlwdGlvbnM"
                title="TITLE GOES HERE"
                aria-describedby="description-id-51175"
                dir="ltr"
              >
                TITLE GOESHERE
              </a>
            </h3>
            <div className="yt-lockup-byline yt-ui-ellipsis yt-ui-ellipsis-2">
              <a
                href="/user/CNETTV"
                className="yt-uix-sessionlink       spf-link "
                data-sessionlink="itct=CHcQlDUYBCITCPCOlonL89cCFci1fgod4egLqSjpHg"
              >
                CNET
              </a>&nbsp;
            </div>
            <div className="yt-lockup-meta ">
              <ul className="yt-lockup-meta-info">
                <li>583 views</li>
                <li>Streamed 2 hours ago</li>
              </ul>
            </div>
            <div className="yt-uix-menu-container yt-lockup-action-menu">
              <div className="yt-uix-menu yt-uix-menu-flipped hide-until-delayloaded">
                <button
                  className="yt-uix-button yt-uix-button-size-default yt-uix-button-lockup-action-menu yt-uix-button-empty yt-uix-button-has-icon no-icon-markup  yt-uix-menu-trigger"
                  type="button"
                  onclick=";return false;"
                  aria-pressed="false"
                  role="button"
                  aria-label="Action menu."
                  aria-haspopup="true"
                />
                <div className="yt-uix-menu-content yt-ui-menu-content yt-uix-menu-content-hidden" role="menu">
                  <ul>
                    <li role="menuitem">
                      <div className="service-endpoint-action-container hid">
                        <div className="service-endpoint-replace-enclosing-action-notification hid">
                          <div className="replace-enclosing-action-message">
                            Video hidden from feed.
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="yt-ui-menu-item yt-uix-menu-close-on-select  dismiss-menu-choice"
                        data-dismissal-token="CAQSEDE1MTI0OTQ2OTYwMDA1Njg%3D"
                        data-innertube-clicktracking="CHcQlDUYBCITCPCOlonL89cCFci1fgod4egLqSjpHg"
                        data-action="replace-enclosing-action"
                      >
                        <span className="yt-ui-menu-item-label">Hide</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoGridCard;