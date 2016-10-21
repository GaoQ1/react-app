import { get,post } from '../../common/ceFetch';

export const FETCH_NOTE = 'FETCH_NOTE';
export const UPDATE = 'UPDATE';
export const GET_AWARD = 'GET_AWARD';

export const update = (data) => {
  return {
    type: UPDATE,
    data
  }
}

export const fetchNote = (data) => {
  return {
    type: FETCH_NOTE,
    payload: {
      promise: post('DNYHandler.ashx',data)
    }
  }
}

export const getAward = (data) => {
  return {
    type: GET_AWARD,
    payload: {
      promise: post('DNYHandler.ashx',data)
    }
  }
}
