/* global module, require */

import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import logger from 'redux-logger'
import { alias } from 'react-chrome-redux';
import aliases from '../actions/aliases';
import { composeWithDevTools } from 'remote-redux-devtools';

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//     // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
//   }) :
//   compose;
const composeEnhancers = composeWithDevTools; //http://remotedev.io/local/

const enhancer = composeEnhancers(
  applyMiddleware(alias(aliases), thunk, logger)
);

export default function (initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;

      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
