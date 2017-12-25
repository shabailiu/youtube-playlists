import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import { FILTER_BY } from '../../../constants/AppConstants';

export class SettingsTab extends Component {
  static propTypes = {};
  
  render() {
    return (
      <div>
        <List subheader={<ListSubheader>Settings</ListSubheader>}>
          <ListItem>
            <ListItemText
              primary="Default time filter"
            />
            <ListItemSecondaryAction>
              <FormControl>
                <InputLabel htmlFor="age-simple">Age</InputLabel>
                <Select
                  value={this.state.age}
                  onChange={this.handleChange}
                  input={<Input name="age" id="age-simple" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
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

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsTab);