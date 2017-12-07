import PropTypes from 'prop-types';

export const videoShape = PropTypes.shape({
  channelName: PropTypes.string.isRequired,
  channelUrl: PropTypes.string.isRequired,
  thumbnailImg: PropTypes.string.isRequired,
  uploadedTimestamp: PropTypes.string.isRequired,
  videoTitle: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
  views: PropTypes.number.isRequired
});

export const playlistShape = PropTypes.shape({
  feedUrl: PropTypes.string.isRequired,
  playlistUrl: PropTypes.string.isRequired,
  videos: PropTypes.arrayOf(videoShape)
});
