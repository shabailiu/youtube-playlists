import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClickableDropdown from '../../ClickableDropdown/ClickableDropdown';
import { FILTER_BY } from '../VideoDisplayUtils';
import { filterVideos } from '../../../actions/PlaylistActions';

export class VideoDisplayHeader extends Component {

  handleClick = itemId => {
    const { handleFilter } = this.props;
    handleFilter(itemId);
  };

  render() {
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
      text: FILTER_BY[filter],
      onClick: this.handleClick
    }));

    return (
      <div className="shelf-title-table">
        <div className="shelf-title-row">
          <h2 className="branded-page-module-title shelf-title-cell">
            <span className="branded-page-module-title-text">Playlist Subscriptions</span>
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

});

const mapDispatchToProps = dispatch => ({
  handleFilter(filter) {
    dispatch(filterVideos(filter));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoDisplayHeader);
