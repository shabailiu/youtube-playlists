import axios from 'axios';
import { parseString } from 'xml2js';

export const parseRSSFeed = async (feed) => {
  const feedsResponse = await axios.get(feed);
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
    promises.push(axios.get(feed));
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

export const isSubscribedPlaylist = (playlistId, playlists) => !!playlists[playlistId];

export const getPlaylistFeedUrl = playlistId => `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;
