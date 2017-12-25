import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import SubscriptionIcon from 'material-ui-icons/Subscriptions';
import SettingsIcon from 'material-ui-icons/Build';
import ManageSubscriptions from './ManageSubscriptions/ManageSubscriptions';
import './ConfigContainer.less';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { red, blue } from 'material-ui/colors';

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: {
      ...blue,
    }
  },
});

export class ConfigContainer extends Component {
  static propTypes = {};

  constructor() {
    super();

    this.state = {
      currTab: 0
    };
  }

  handleClickTab = (event, value) => {
    this.setState({ currTab: value });
  };

  render() {
    const { currTab } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <AppBar
            position="static"
            color="primary"
            id="config-tab-header"
          >
            <Tabs
              value={currTab}
              onChange={this.handleClickTab}
              fullWidth
              centered
              indicatorColor="inherit"
              textColor="inherit"
            >
              <Tab icon={<SubscriptionIcon />} />
              <Tab icon={<SettingsIcon />} />
            </Tabs>
          </AppBar>
          {currTab === 0 && <ManageSubscriptions />}
          {currTab === 1 && <div>Item Two</div>}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect()(ConfigContainer);