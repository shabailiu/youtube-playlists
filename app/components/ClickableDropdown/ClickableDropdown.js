import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClickableDropdownItem from './ClickableDropdownItem';

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
      currSelected: selectedText || (props.items[0] && props.items[0].text) || null
    };
  }

  handleClick = itemId => {
    const item = this.props.items.find(item => itemId === item.id);

    if (item) {
      this.setState({
        currSelected: item.text
      });
      item && item.onClick(itemId);
    }
  };

  render() {
    const { items } = this.props;
    const { currSelected } = this.state;
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
            <span
              className=" yt-uix-button-menu-item spf-link"
            >
              {item.text}
            </span>
          </ClickableDropdownItem>
        </li>
      );
    });

    return (
      <button
        aria-expanded="false"
        className="subnav-flow-menu yt-uix-button yt-uix-button-default yt-uix-button-size-default"
        aria-haspopup="true"
        type="button"
        onClick={false}
        data-button-menu-indicate-selected="true"
      >
        <span className="yt-uix-button-content">
          {currSelected}
        </span>
        <span className="yt-uix-button-arrow yt-sprite" />
        <ul className=" yt-uix-button-menu yt-uix-button-menu-default hid" role="menu" aria-haspopup="true">
          {menuItems}
        </ul>
      </button>
    )
  }
}

export default ClickableDropdown;
