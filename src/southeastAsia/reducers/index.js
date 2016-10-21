import { combineReducers } from 'redux';

// import { Map } from 'immutable'

import * as getNote from './getNote';

// let state = Map({});

const todoApp = combineReducers({
  ...getNote
})

export default todoApp
