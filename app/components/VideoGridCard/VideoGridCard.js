import React, { Component } from 'react';
import { videoShape } from '../../constants/PropTypeValidation';
import { formatViewCount, formatTimestampRelative } from '../../utils/playlists';
import './VideoGridCard.less';

export class VideoGridCard extends Component {
  static propTypes = {
    ...videoShape
  };

  render() {
    const { channelName, channelUrl, thumbnailImg, uploadedTimestamp, videoId, videoTitle, videoUrl, views } = this.props;
    return (
      <div className="yt-lockup yt-lockup-grid yt-lockup-video clearfix">
        <div className="yt-lockup-dismissable">
          <div className="yt-lockup-thumbnail contains-addto">
            <a
              aria-hidden="true"
              href={videoUrl}
              className=" yt-uix-sessionlink      spf-link "
            >
              <div className="yt-thumb video-thumb yt-uix-mouseover-img-wrap">
                <span className="yt-thumb-simple">
                  <img
                    data-mouseover-log="True"
                    alt=""
                    data-ytimg="1"
                    src={thumbnailImg}
                  />
                </span>
              </div>
            </a>
            <span className="thumb-menu dark-overflow-action-menu video-actions">
              <button
                className="yt-uix-button-reverse flip addto-watch-queue-menu spf-nolink hide-until-delayloaded yt-uix-button yt-uix-button-dark-overflow-action-menu yt-uix-button-size-default yt-uix-button-has-icon no-icon-markup yt-uix-button-empty"
                aria-haspopup="true"
                onClick={false}
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
                    onClick={false}
                    data-video-ids={videoId}
                  >
                    <span className="addto-watch-queue-menu-text">Play next</span>
                  </li>
                  <li
                    role="menuitem"
                    className="overflow-menu-choice addto-watch-queue-menu-choice addto-watch-queue-play-now yt-uix-button-menu-item"
                    data-action="play-now"
                    onClick={false}
                    data-video-ids={videoId}
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
                href={videoUrl}
                className=" yt-ui-ellipsis yt-ui-ellipsis-2 yt-uix-sessionlink      spf-link "
                title={videoTitle}
                aria-describedby="description-id-51175"
                dir="ltr"
              >
                {videoTitle}
              </a>
            </h3>
            <div className="yt-lockup-byline yt-ui-ellipsis yt-ui-ellipsis-2">
              <a
                href={channelUrl}
                className="yt-uix-sessionlink       spf-link "
              >
                {channelName}
              </a>&nbsp;
            </div>
            <div className="yt-lockup-meta ">
              <ul className="yt-lockup-meta-info">
                <li>{formatViewCount(views)} views</li>
                <li>{formatTimestampRelative(uploadedTimestamp)}</li>
              </ul>
            </div>
            <div className="yt-uix-menu-container yt-lockup-action-menu">
              <div className="yt-uix-menu yt-uix-menu-flipped hide-until-delayloaded">
                <button
                  className="yt-uix-button yt-uix-button-size-default yt-uix-button-lockup-action-menu yt-uix-button-empty yt-uix-button-has-icon no-icon-markup  yt-uix-menu-trigger"
                  type="button"
                  onClick={false}
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