export const PAGE_TYPE = {
  SUBSCRIPTION_HOME: 'SUBSCRIPTION_HOME',
  USER_HOME: 'USER_HOME',
  USER_PLAYLISTS: 'USER_PLAYLISTS',
  PLAYLIST_HOME: 'PLAYLIST_HOME'
};

export const mapUrlToPageType = {
  '^http(s?)://www\\.youtube\\.com/.+/.+/playlists': PAGE_TYPE.USER_PLAYLISTS,
  '^http(s?)://www\\.youtube\\.com/feed/subscriptions': PAGE_TYPE.SUBSCRIPTION_HOME,
  '^http(s?)://www\\.youtube\\.com/user': PAGE_TYPE.USER_HOME,
  '^http(s?)://www\\.youtube\\.com/playlist': PAGE_TYPE.PLAYLIST_HOME
};

export const getPageType = url => {
  const key = Object.keys(mapUrlToPageType).find(curr => !!url.match(curr));
  if (key) {
    return mapUrlToPageType[key];
  }
  return undefined;
};

/**
 * Determine if an AJAX response URL is for a page load
 */
export const isAJAXPageResponse = response => {
  const invalidPaths = [
    'service_ajax',
    'videos.xml'
  ];

  try {
    const urlObj = new URL(response.url);
    return response.type === 'xmlhttprequest' && !urlObj.pathname.match(invalidPaths.join('|'));
  } catch (err) {
    console.error(`[ytp] unable to parse URL (${response && response.url})`);
    return false;
  }
};