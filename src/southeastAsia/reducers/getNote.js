import { FETCH_NOTE, UPDATE, GET_AWARD, FETCH_CODE } from '../actions/getNote';

import { Map } from 'immutable';

export function NoteList(state = Map(), action){
  switch (action.type) {
    case `${FETCH_NOTE}_SUCCESS`:
      return state.merge(Map({note: action.payload}));

    case `${GET_AWARD}_SUCCESS`:
      return state.merge(Map({award: action.payload}));

    case UPDATE:
      return state.merge(Map(action.data));

    default:
      return state;
  }
}
