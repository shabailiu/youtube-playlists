import axios from 'axios';
import { parseString } from 'xml2js';
import get from 'lodash/get';
import moment from 'moment';

export const parseRSSFeed = async (feed) => {
  let feedsResponse;

  try {
    console.debug('[ytp] parsing feed: ' + feed);
    feedsResponse = await axios.get(feed, {
      timeout: 3000 //TODO config and UI warning
    });
  } catch (err) {
    return Promise.reject(`Error reading feed (${feed}): ${err}`);
  }

  const unparsedXml = feedsResponse.data;

  return new Promise((resolve, reject) => {
    parseString(unparsedXml, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

/**
 * Takes a list of RSS feeds and returns a list of objects
 * @param feeds URLs of feeds
 * @returns {Promise.<Array>}
 */
export const parseRSSFeeds = async (feeds) => {
  const promises = [];

  feeds.forEach(feed => {
    promises.push(axios.get(feed, {
      timeout: 3000
    }));
  });

  const feedsResponse = await Promise.all(promises);
  const unparsedXml = feedsResponse.map(playlist => playlist.data);
  const parsedXml = [];

  unparsedXml.forEach(xml => {
    parseString(xml, (err, res) => { //TODO promisify this
      parsedXml.push(res);
    });
  });

  return parsedXml;
};

export const parseVideosFromFeed = (playlistId, videos = []) => videos.map(video => ({
  channelName: get(video, 'author[0].name[0]'),
  channelUrl: get(video, 'author[0].uri[0]'),
  playlistId,
  thumbnailImg: get(video, 'media:group[0].media:thumbnail[0].$.url'),
  uploadedTimestamp: get(video, 'published[0]'),
  videoId: get(video, 'yt:videoId[0]'),
  videoTitle: get(video, 'media:group[0].media:title[0]'),
  videoUrl: getVideoUrl(get(video, 'yt:videoId[0]')),
  views: get(video, 'media:group[0].media:community[0].media:statistics[0].$.views')
}));

export const isSubscribedPlaylist = (playlistId, playlists) => !!playlists[playlistId];

export const getPlaylistFeedUrl = playlistId => `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;

export const getPlaylistUrl = playlistId => `https://www.youtube.com/playlist?list=${playlistId}`;

export const getVideoUrl = videoId => `/watch?v=${videoId}`;

/**
 * Format view count to a more readable format.
 * @param views
 */
export const formatViewCount = views => {
  try {
    return parseInt(views).toLocaleString();
  } catch (err) {
    //TODO error handling
  }
};

export const formatTimestampRelative = timestamp => moment(timestamp).fromNow();

export const parsePlaylistDetails = (playlistId, feedData = {}) => ({
  authorName: get(feedData, 'author[0].name[0]'),
  authorUrl: get(feedData, 'author[0].uri[0]'),
  feedUrl: getPlaylistFeedUrl(playlistId),
  playlistUrl: getPlaylistUrl(playlistId),
  title: get(feedData, 'title[0]'),
  videos: parseVideosFromFeed(playlistId, feedData.entry)
});

export const pickAllVideos = playlists => (
  Object
    .values(playlists)
    .map(playlist => playlist.videos)
    .reduce((acc, curr) => acc.concat(curr), []) // Flatten array
    .reduce((acc, curr) => { // Dedup
      if (!curr) {
        return acc;
      }

      const { ids, result } = acc;

      if (ids.indexOf(curr.videoId) === -1) {
        result.push(curr);
        ids.push(curr.videoId);
      }

      return acc;
    }, { ids: [], result: [] })
    .result
);
