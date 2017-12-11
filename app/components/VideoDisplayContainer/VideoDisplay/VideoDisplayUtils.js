import moment from 'moment';

export const FILTER_BY = {
  TODAY: 'TODAY',
  LAST_3_DAYS: 'LAST_3_DAYS',
  LAST_WEEK: 'LAST_WEEK',
  LAST_MONTH: 'LAST_MONTH',
  LAST_YEAR: 'LAST_YEAR'
};

const mapFilterToMoment = {
  [FILTER_BY.TODAY]: moment().subtract(1, 'day'),
  [FILTER_BY.LAST_3_DAYS]: moment().subtract(3, 'days'),
  [FILTER_BY.LAST_WEEK]: moment().subtract(1, 'week'),
  [FILTER_BY.LAST_MONTH]: moment().subtract(1, 'month'),
  [FILTER_BY.LAST_YEAR]: moment().subtract(1, 'year')
};

/**
 * Filter which videos to show, and sort by descending uploaded timestamp.
 * @param videos
 * @param maxResults
 * @param filterMethod FILTER_BY
 */
//TODO this may be optimized if the RSS feed is already guaranteed to be sorted
export const filterVideos = (videos, maxResults = 12, filterMethod = FILTER_BY.LAST_3_DAYS) => {
  const minTime = mapFilterToMoment[filterMethod];
  return videos
    .filter(video => moment(video.uploadedTimestamp).isAfter(minTime))
    .sort((a, b) => new Date(b.uploadedTimestamp) - new Date(a.uploadedTimestamp))
    .slice(0, maxResults);
};
