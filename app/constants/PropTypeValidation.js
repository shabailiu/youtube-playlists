import PropTypes from 'prop-types';

export const videoShape = PropTypes.shape({
  videoTitle: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
  thumbnailImg: PropTypes.string.isRequired,
  channelName: PropTypes.string.isRequired,
  channelUrl: PropTypes.string.isRequired,
  views: PropTypes.number.isRequired,
  timestamp: PropTypes.string.isRequired
});

export const playlistShape = PropTypes.shape({
  feedUrl: PropTypes.string.isRequired,
  playlistUrl: PropTypes.string,
  videos: PropTypes.arrayOf(videoShape)
});
