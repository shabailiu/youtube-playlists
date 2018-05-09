import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { alias } from 'react-chrome-redux';
import aliases from '../actions/aliases';

const enhancer = compose(
  applyMiddleware(alias(aliases), thunk)
);

export default function (initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
