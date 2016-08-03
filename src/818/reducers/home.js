import { HOME_LOAD,ADD_INPUT_FIELD,REMOVE_INPUT_FIELD,SET_TRANSLATE,SUBMIT,SUBMIT_DATA,submitToServer,UPDATE_INPUT_FIELD } from '../actions/home';
import {createValidator,required,verifyPhone,verifyCard} from '../utils/validation'
import {getP} from '../../common/HybirdAPI/UtilityApi'
import {alert} from '../utils/alert'
import store from '../store'
let id=0;
export function homeLoad(state = {
	fields:[new FieldsCreater]
}, action) {
  switch (action.type) {
      case `${HOME_LOAD}_SUCCESS`:
          return homeLoadSuccess(state, action);

      case `${HOME_LOAD}_ERROR`:
          return state

      case ADD_INPUT_FIELD:
          return addInputField(state, action);

      case REMOVE_INPUT_FIELD:
          return removeInputField(state, action);

      case SET_TRANSLATE:
          return setTranslateX(state, action);

      case SUBMIT:
          return submit(state, action);

      case `${SUBMIT_DATA}_SUCCESS`:
          return submitDataSuccess(state, action);

      case UPDATE_INPUT_FIELD:
          return updateFiled(state, action)
      default:
          return state
  }
  }

/*进入页面获取用户数据*/
function homeLoadSuccess({fields,...loadData} , {payload:{Data}}){

	let {ChangPassengerCard,MobilePhone,UserType,TotalPoint}=Data;

	if(UserType==2){
		fields[0].card=ChangPassengerCard;
		fields[0].phone=MobilePhone;
	}

	if(TotalPoint>=2000&&fields.length<5)
		fields.push(new FieldsCreater())
	else if(TotalPoint<1000){
		alert('积分不足！',function(){
			location.href='http://eb.ceair.com/activity/818/assets/index.html';
		});
	}

	return {
		TotalPoint,
		ChangPassengerCard,
		MobilePhone,
		fields,
		...loadData
	};
}


function addInputField({fields,...loadData} , action){
	if(fields.length<5)
		fields.push(new FieldsCreater());
	return {
		fields,
		...loadData
	}
}

function removeInputField({fields,...loadData} , {index}){
	if(fields.length>1)
		fields.splice(index,1);
	return {
		fields,
		...loadData
	}
}
function setTranslateX({fields,...loadData},{index,translateX}){
	fields[index]['translateX']=translateX;
	return{
		fields,
		...loadData
	}
}

function submit({fields,TotalPoint,...loadData},action){
	let validator=createValidator({
			card: [required('卡号为空'), verifyCard()],
			phone: [required('手机号为空'), verifyPhone()]
		}),
		vaility=true,
		len=fields.length;
	fields.forEach((field)=>{
		let {card,phone}=field;
		let error= validator({card,phone});
		field.error=error||{};
		if(!checkOnly(field,fields)||error){
			vaility=!vaility?vaility:false;
		}
	})
	if(vaility){
		if( Math.floor(TotalPoint/1000)<len ){
			alert('积分不足！');
		}
		else{
			let params=[];
			fields.forEach((field)=>{
				let {card,phone}=field;
				let type= 2;

				params.push({
					ffpNo:card,
					mobileNo:phone,
					type
				})

			})
			params.unshift({
				ffpNo:loadData.ChangPassengerCard,
				mobileNo:loadData.MobilePhone,
				type:1
			})
			setTimeout(()=>store.dispatch(submitToServer({userInfoRequests:params})),0)
		}
	}

	return {
		TotalPoint,
		fields,
		...loadData
	}
}

function checkOnly(field,fields){
	let verifyKeys=[{key:'card',msg:'卡号重复'},{key:'phone',msg:'手机号重复'}];
	let vaility=true;
	fields.forEach(function(fd){
		if(fd.id!=field.id){
			let errors;
			verifyKeys.forEach(function({key,msg}){
				if(fd[key]!=undefined&& fd[key]!=''&& fd[key]==field[key]){
					errors=errors||{};
					errors[key]=msg;
					vaility=!vaility?vaility:false;
				}
			})

			Object.assign(field.error,errors);
		}
	})

	return vaility;

}

function submitDataSuccess(state,{payload:{Data}}){
	if(Data.PaymentUrl)		
		location.href=Data.PaymentUrl+((Data.PaymentUrl.indexOf('?') == -1) ? '?' : '&') + 'p='+encodeURIComponent(getP());
	return state;
}

function updateFiled({fields,...loadData},{index,values}){
	Object.assign(fields[index],values);
	return{
		fields,
		...loadData
	}
}


function getId(){
	return ++id;
}

function FieldsCreater(args={}){
	let {card,phone}=args;
	this.id=getId();
	this.card=card;
	this.phone=phone;
	this.translateX=0;
	this.error={
		card:null,
		phone:null
	}
}
