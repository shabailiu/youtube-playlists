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

    const filterByItems = Object.keys(FILTER_BY).map(filter => ({
      id: filter,
      text: FILTER_BY_DISPLAY_VALUES[filter],
      onClick: this.handleClick,
      defaultSelected: filter === filterBy
    }));

    return (
      <div>
        <div className="ytp-title-container">
          <h2>Playlist Subscriptions</h2>
          <div>
            <div>
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
