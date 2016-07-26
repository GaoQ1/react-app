import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import Topay from './containers/Topay';
import Payment from './containers/Payment';
import {sendPageView} from '../common/pageViewStat'
import {bindBack,bindTitle,hybirdLogin,getP,saveAppParam} from '../common/HybirdAPI/UtilityApi'



//路由的配置
const routes = (
  <Route component={App} >
    <Route path="/" component={Home} onEnter={routerEnter}/>
    <Route path="/topay" component={Topay} onEnter={routerEnter}/>
    <Route path="/payment" component={Payment} onEnter={routerEnter}/>
  </Route>
)

export default routes
function routerEnter(nextState, replace,callback){
	let {location:{query,pathname}}=nextState;
	// console.log(nextState)
	saveAppParam(query);//存取hybird 传递的参数
	sendPageView(query.p);//ga 发送页面统计
	let p=getP();
	!p==true?hybirdLogin():callback();	//检查登陆
	let isFirst=['/topay'].indexOf(pathname)>-1;
	bindBack(isFirst);//hybird app绑定回退
}

