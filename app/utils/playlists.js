import axios from 'axios';
import { parseString } from 'xml2js';

/**
 * Takes a list of RSS feeds and returns a list of objects
 * @param feeds
 * @returns {Promise.<Array>}
 */
export async function parseRSSFeeds(feeds) {
  const promises = [];

  feeds.forEach(feed => {
    promises.push(axios.get(feed));
  });

  const feedsResponse = await Promise.all(promises);
  const unparsedXml = feedsResponse.map(playlist => playlist.data);
  const parsedXml = [];

  unparsedXml.forEach(xml => {
    parseString(xml, (err, res) => {
      parsedXml.push(res);
    });
  });

  return parsedXml;
}