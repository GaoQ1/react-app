import { get,post } from '../../common/ceFetch';

export const HOME_LOAD = 'HOME_LOAD';
export const ADD_INPUT_FIELD = 'ADD_INPUT_FIELD';
export const REMOVE_INPUT_FIELD = 'REMOVE_INPUT_FIELD';
export const SET_TRANSLATE = 'SET_TRANSLATE';
export const SUBMIT = 'SUBMIT';
export const SUBMIT_DATA='SUBMIT_DATA';
export const UPDATE_INPUT_FIELD='UPDATE_INPUT_FIELD'

export const homeLoad = () => {
  return {
    type: HOME_LOAD,
    payload: get('api/UserInfo/GetUserInfo')
  }
};


export const addInputField=()=>{
	return {
		type: ADD_INPUT_FIELD
	}
}

export const removeInputField=(e,index)=>{
	return {
		type: REMOVE_INPUT_FIELD,
		index
	}
}

export const setTranslateX=(index,translateX)=>{
	return{
		type:SET_TRANSLATE,
		index,
		translateX
	}
}

export const submit=()=>{
	return{
		type:SUBMIT
	}
}

export const submitToServer=(data)=>{
	return {
		type:SUBMIT_DATA,
		payload:{
			promise:post('api/UserInfo/CheckUserCouponInfo',data),
			data
		}
	}
}

export const updateFiled=(index,values)=>{
	return {
		type:UPDATE_INPUT_FIELD,
		values,
		index
	}
}
