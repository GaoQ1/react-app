import { combineReducers } from 'redux-immutable';

import * as home from './home';
import * as order from './order';

const todoApp = combineReducers({
  ...home,
  ...order
})

export default todoApp
