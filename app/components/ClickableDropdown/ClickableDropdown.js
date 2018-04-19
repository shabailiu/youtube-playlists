import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClickableDropdownItem from './ClickableDropdownItem';
import './ClickableDropdown.less';

export class ClickableDropdown extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      defaultSelected: PropTypes.bool // If not passed in, defaults to first item
    }))
  };

  static defaultProps = {
    items: []
  };

  constructor(props) {
    super(props);

    const selectedItem = props.items.find(item => item.defaultSelected);
    const selectedText = selectedItem && selectedItem.text;

    this.state = {
      currSelected: selectedText || (props.items[0] && props.items[0].text) || null,
      showDropdown: false
    };
  }

  handleClick = itemId => {
    const item = this.props.items.find(item => itemId === item.id);

    if (item) {
      this.setState({
        currSelected: item.text,
        showDropdown: false
      });
      item && item.onClick(item.id);
    }
  };

  toggleDropdown = event => {
    event.preventDefault();
    this.setState({
      showDropdown: !this.state.showDropdown
    });
  };

  render() {
    const { items } = this.props;
    const { currSelected, showDropdown } = this.state;
    const menuItems = [];

    items.forEach(item => {
      menuItems.push(
        <li
          key={item.id}
          role="menuitem"
        >
          <ClickableDropdownItem
            id={item.id}
            onClick={this.handleClick}
          >
            {item.text}
          </ClickableDropdownItem>
        </li>
      );
    });

    const selectedClass = showDropdown ? 'ytp-ClickableDropdown-selected-up' : 'ytp-ClickableDropdown-selected-down';

    return (
      <div className="ytp-ClickableDropdown">
        <button
          type="button"
          onClick={this.toggleDropdown}
        >
          <span className={selectedClass}>
            {currSelected}
          </span>
        </button>

        {showDropdown && (
          <ul className="ytp-ClickableDropdown-items">
            {menuItems}
          </ul>
        )}
      </div>
    )
  }
}

export default ClickableDropdown;
