import PropTypes from 'prop-types';

export const videoShape = {
  channelName: PropTypes.string.isRequired,
  channelUrl: PropTypes.string.isRequired,
  playlistId: PropTypes.string.isRequired, //TODO: when we're filtering videos, there's no connection back to the parent object...
  thumbnailImg: PropTypes.string.isRequired,
  uploadedTimestamp: PropTypes.string.isRequired,
  videoId: PropTypes.string.isRequired,
  videoTitle: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
  views: PropTypes.string.isRequired
};

export const playlistShape = {
  feedUrl: PropTypes.string,
  playlistUrl: PropTypes.string,
  title: PropTypes.string,
  videos: PropTypes.arrayOf(PropTypes.shape(videoShape))
};
