import React, { Component } from 'react';
import { videoShape } from '../../constants/PropTypeValidation';
import { formatViewCount, formatTimestampRelative } from '../../utils/playlists';
import './VideoGridCard.less';
import VideoPlaylistTitle from './VideoPlaylistTitle/VideoPlaylistTitle';

export class VideoGridCard extends Component {
  static propTypes = {
    ...videoShape
  };

  render() {
    const {
      channelName,
      channelUrl,
      playlistTitle,
      thumbnailImg,
      uploadedTimestamp,
      videoId,
      videoTitle,
      videoUrl,
      views
    } = this.props;

    return (
      <div className="ytp-VideoGridCard">
        <a href={videoUrl}>
          <div className="ytp-VideoGridCard-thumbnail">
            <img
              alt=""
              src={thumbnailImg}
            />
            <div className="ytp-VideoGridCard-thumbnail-hover" />
          </div>
          <div className="ytp-VideoGridCard-details">
            <h3 className="ytp-VideoGridCard-title">
              <VideoPlaylistTitle title={playlistTitle} />
              {videoTitle}
            </h3>
            <div className="ytp-VideoGridCard-channel">
              <a href={channelUrl}>{channelName}</a>
            </div>
            <div className="ytp-VideoGridCard-meta">
              <span>{formatViewCount(views)} views</span>
              <span>{formatTimestampRelative(uploadedTimestamp)}</span>
            </div>
          </div>
        </a>
      </div>
    );
  }
}

export default VideoGridCard;