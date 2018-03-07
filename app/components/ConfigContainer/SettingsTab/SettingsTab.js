import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List, {
  ListSubheader,
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { FILTER_BY, FILTER_BY_DISPLAY_VALUES } from '../../../constants/AppConstants';

export class SettingsTab extends Component {
  static propTypes = {
    filterBy: PropTypes.oneOf(Object.values(FILTER_BY))
  };

  handleChangeFilterBy = event => {
    console.log('e', event.target);
  };

  render() {
    const { filterBy } = this.props;

    return (
      <div>
        <List subheader={<ListSubheader>Settings</ListSubheader>}>
          <ListItem>
            <ListItemText
              primary="Default time filter"
            />
            <ListItemSecondaryAction>
              <FormControl>
                <Select
                  value={filterBy}
                  onChange={this.handleChangeFilterBy}
                  input={<Input name="filterBy" />}
                >
                  {
                    Object.keys(FILTER_BY_DISPLAY_VALUES).map(filter => (
                      <MenuItem key={filter} value={filter}>{FILTER_BY_DISPLAY_VALUES[filter]}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filterBy: state.app.filterBy
});

const mapDispatchToProps = dispatch => ({
  changeFilterBy(newFilter) {
    dispatch();
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsTab);