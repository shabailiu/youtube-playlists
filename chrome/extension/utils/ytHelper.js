import { COMPONENT_TYPE } from '../../../app/AppRoot';

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

export const mapPageTypeToComponents = {
  [PAGE_TYPE.SUBSCRIPTION_HOME]: [COMPONENT_TYPE.PLAYLIST_CONTAINER],
  [PAGE_TYPE.USER_HOME]: [COMPONENT_TYPE.SUBSCRIPTION_BUTTON],
  [PAGE_TYPE.USER_PLAYLISTS]: [COMPONENT_TYPE.SUBSCRIPTION_BUTTON],
  [PAGE_TYPE.PLAYLIST_HOME]: [COMPONENT_TYPE.PROMINENT_SUBSCRIPTION_BUTTON]
};

export const getPageType = url => {
  const key = Object.keys(mapUrlToPageType).find(curr => !!url.match(curr));
  if (key) {
    return mapUrlToPageType[key];
  }
  return undefined;
};

export const isPageLoaded = pageType => {
  switch (pageType) {
    case PAGE_TYPE.SUBSCRIPTION_HOME:
      return !!document.querySelector('#browse-items-primary > .section-list');
    case PAGE_TYPE.USER_HOME:
      const homeTab = document.querySelector('#channel-navigation-menu .epic-nav-item-heading[aria-label="Home tab"]');
      return homeTab && homeTab.getAttribute('aria-selected');
    case PAGE_TYPE.USER_PLAYLISTS:
      const playlistTab = document.querySelector('#channel-navigation-menu .epic-nav-item-heading[aria-label="Playlists tab"]');
      return playlistTab && playlistTab.getAttribute('aria-selected');
    case PAGE_TYPE.PLAYLIST_HOME:
      return !!document.getElementById('pl-header');
  }
};
