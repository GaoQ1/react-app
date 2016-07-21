import { combineReducers } from 'redux';
import visibilityFilter from './visibilityFilter';
import todos from './todos';
import * as home from './home';

const todoApp = combineReducers({
  visibilityFilter,
  todos,
  ...home
})

export default todoApp
