import React from 'react';
import ReactDOM from 'react-dom';
import ConfigRoot from '../../app/ConfigRoot';
import { Store } from 'react-chrome-redux';

const store = new Store({
  portName: 'MY_APP' // communication port name
});

store.ready().then(() => {
  ReactDOM.render(
    <ConfigRoot store={store} />,
    document.getElementById('root')
  );
});