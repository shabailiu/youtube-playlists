import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ClickableDropdown from '../../ClickableDropdown/ClickableDropdown';
import { filterVideos } from '../../../actions/AppActions';
import { FILTER_BY, FILTER_BY_DISPLAY_VALUES } from '../../../constants/AppConstants';

export class VideoDisplayHeader extends Component {
  static propTypes = {
    filterBy: PropTypes.oneOf(Object.values(FILTER_BY)),
    handleFilter: PropTypes.func.isRequired
  };

  handleClick = itemId => {
    const { handleFilter } = this.props;
    handleFilter(itemId);
  };

  render() {
    const { filterBy } = this.props;

    const switchView = (
      <div className="yt-uix-menu-container feed-item-action-menu">
        <ul className="yt-uix-menu-top-level-button-container">
          <li className="yt-uix-menu-top-level-button yt-uix-menu-top-level-flow-button">
            <button
              className="yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-empty yt-uix-button-has-icon yt-uix-tooltip"
              type="button"
              onClick={false}
              aria-label="Switch to grid view"
              title="Grid"
              disabled="True"
            >
              <span className="yt-uix-button-icon-wrapper">
                <span className="yt-uix-button-icon yt-uix-button-icon-view-module yt-sprite" />
              </span>
            </button>
          </li>
          <li className="yt-uix-menu-top-level-button yt-uix-menu-top-level-flow-button">
            <a
              href="/feed/subscriptions?flow=2"
              className="yt-uix-button   yt-uix-sessionlink yt-uix-button-opacity yt-uix-button-size-default yt-uix-button-has-icon yt-uix-tooltip yt-uix-button-empty"
              aria-label="Switch to list view"
              title="List"
            >
              <span className="yt-uix-button-icon-wrapper">
                <span className="yt-uix-button-icon yt-uix-button-icon-view-list yt-sprite" />
              </span>
            </a>
          </li>
        </ul>
      </div>
    );

    const filterByItems = Object.keys(FILTER_BY).map(filter => ({
      id: filter,
      text: FILTER_BY_DISPLAY_VALUES[filter],
      onClick: this.handleClick,
      defaultSelected: filter === filterBy
    }));

    return (
      <div className="grid-subheader style-scope ytd-shelf-renderer">
        <div id="title-container" className="style-scope ytd-shelf-renderer">
          <h2 className="style-scope ytd-shelf-renderer">
            <span id="title" className="branded-page-module-title-text">Playlist Subscriptions</span>
          </h2>
          <div className="menu-container shelf-title-cell">
            <div className="yt-uix-menu-container feed-item-action-menu">
              Show:&nbsp;&nbsp;
              <ClickableDropdown
                items={filterByItems}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filterBy: state.app.filterBy
});

const mapDispatchToProps = dispatch => ({
  handleFilter(filter) {
    dispatch(filterVideos(filter));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoDisplayHeader);
