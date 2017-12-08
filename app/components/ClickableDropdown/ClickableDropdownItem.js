import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ClickableDropdownItem extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  handleClick = () => {
    const { id, onClick } = this.props;
    onClick(id);
  };

  render() {
    const { children } = this.props;
    return (
      <div onClick={this.handleClick}>
        {children}
      </div>
    )
  }
}

export default ClickableDropdownItem;