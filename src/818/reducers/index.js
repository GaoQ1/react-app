import { combineReducers } from 'redux';
import * as home from './home';

const todoApp = combineReducers({
  ...home
})

export default todoApp
