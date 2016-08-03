import { get,post } from '../../common/ceFetch';

export const ORDER_LIST = 'ORDER_LIST';
export const SUBMIT_ORDER = 'SUBMIT_ORDER';

export const orderList = (page=1,size=5) => {
  return {
    type: ORDER_LIST,
    payload: {
      promise: get(`api/Order/GetOrderList?page=${page}&pageSize=${size}`)
    }
  }
}

export const submitOrder = (id) => {
  return {
    type: SUBMIT_ORDER,
    payload: {
      promise: get(`api/Booking/PayApply?orderID=${id}`)
    }
  }
}
