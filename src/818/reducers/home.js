import { HOME_LOAD } from '../actions/home';

export function homeLoad(state = {}, action) {
  switch (action.type) {
    case `${HOME_LOAD}_SUCCESS`:
      return action.payload.Data
    case `${HOME_LOAD}_ERROR`:
      console.log('error',state);
      return state
    default:
      return state
  }
}
