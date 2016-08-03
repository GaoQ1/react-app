import { ORDER_LIST, SUBMIT_ORDER, orderList, submitOrder } from '../actions/order';
import {getP} from '../../common/HybirdAPI/UtilityApi';
import {alert} from '../utils/alert';


export function orderListLoad(state=[], action){
  switch (action.type) {
    case `${ORDER_LIST}_SUCCESS`:
      return orderLoadSuccess(state, action);

    case `${ORDER_LIST}_ERROR`:
      return state;

    case `${SUBMIT_ORDER}_SUCCESS`:
      return submitDataSuccess(state, action);

    default:
      return state;
  }
}

function orderLoadSuccess(state,{payload: {Data}}){
  return Data;
}

function submitDataSuccess(state, {payload: {Data}}){
  if(Data.PaymentUrl)
		location.href=Data.PaymentUrl+((Data.PaymentUrl.indexOf('?') == -1) ? '?' : '&') + 'p='+encodeURIComponent(getP());
	return state;
}
