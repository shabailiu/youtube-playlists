import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/containers/Root';

console.log('in todoapp.js');
// chrome.storage.local.get('state', (obj) => {
//   const { state } = obj;
//   const initialState = JSON.parse(state || '{}');

  const createStore = require('../../app/store/configureStore');

  ReactDOM.render(
    <Root store={createStore({})} />,
    document.querySelector('#root')
  );
// });
