import 'whatwg-fetch'
/*
	@option object
	{
		method 请求方式
		url 请求路径
		data post请求数据
		params get请求数据
		header 请求头参数
		其他参数根据fecth规范
	}
*/
const ceFecth=function(option){
	let {method='GET',data,url,params,credentials='include',headers={},...config}=option;
	headers=Object.assign({'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',Accept:'application/json, text/plain, */*'},headers);
	if(method.toUpperCase()=='POST')
	{
		config.body=headers['Content-Type'].indexOf('x-www-form-urlencoded')==-1?data:serialize(data);
	}
	url=buildUrl(url,paramSerializer(params));	
	return fetch(url,{
		method,
		credentials,
		headers,
		...config
	})
	.then(checkStatus)
	.then(parseJSON)
	.catch(catchParseJSON)
	.then(checkCode)
}

function _get(url,{...config}={}){
	return ceFecth({
		...config,
		method:'GET',
		url:url
	})
}

function _post(url,data={},{...config}={}){
	return ceFecth({
		...config,
		method:'POST',
		url:url,
		data:data
	})
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {  	
    return Promise.resolve(response)
  } else {
    var error = new Error(response.statusText)
    error.response = response
    return Promise.reject(response) 
  }
}

function parseJSON(response) {	
  return response.json()
}

function catchParseJSON(error){
	console.log(error);
}

function checkCode(response={}){
	 switch(response.Code){
		case 200:
			return Promise.resolve(response);
			break;
		default:
			return Promise.reject(response);
	}
}


function serialize(data){
	var strs=[];
	Object.keys(data).forEach((key)=>{
		param(data[key],key,strs);
	})
	return strs.join('&');
}

function param(data,prefix,strs){
	if (typeof data==='object' && data!=undefined) {
		Object.keys(data).forEach((key)=>{
			var pref = prefix + '[' + key + ']';
			param(data[key], pref, strs);
		})
		
	} else if(data!==undefined) {
		strs.push(encodeURIComponent(prefix) + '=' + encodeURIComponent(data));
	}
}

function paramSerializer(params={}) {
	var parts = [];

	Object.keys(params).forEach((key)=>{
		if(typeof params[key]!=='object'&& params[key]!==undefined)
			parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
	}) 

	return parts.join('&');
};

function buildUrl(url, serializedParams) {
	if (serializedParams.length > 0) {
		url += ((url.indexOf('?') == -1) ? '?' : '&') + serializedParams;
	}
	return url;
}

ceFecth.get=_get;
ceFecth.post=_post;
export default ceFecth;
export const get= _get;
export const post= _post;