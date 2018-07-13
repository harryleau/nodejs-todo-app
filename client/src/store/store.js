import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../reducers/authReducer';
import errorReducer from '../reducers/errorReducer';
import todoReducer from '../reducers/todoReducer';
import filtersReducer from '../reducers/filtersReducer';

const initialState = {};

const store = createStore(
  combineReducers({
    auth: authReducer,
    todo: todoReducer,
    filters: filtersReducer,
    errors: errorReducer
  }),
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
