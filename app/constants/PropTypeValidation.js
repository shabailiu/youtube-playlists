import PropTypes from 'prop-types';

export const videoShape = {
  channelName: PropTypes.string.isRequired,
  channelUrl: PropTypes.string.isRequired,
  thumbnailImg: PropTypes.string.isRequired,
  uploadedTimestamp: PropTypes.string.isRequired,
  videoId: PropTypes.string.isRequired,
  videoTitle: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
  views: PropTypes.string.isRequired
};

export const playlistShape = {
  feedUrl: PropTypes.string.isRequired,
  playlistUrl: PropTypes.string.isRequired,
  videos: PropTypes.arrayOf(PropTypes.shape(videoShape))
};
