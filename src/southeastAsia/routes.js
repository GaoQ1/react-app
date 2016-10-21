import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Login from './containers/Login';
import Award from './containers/Award';
import Home from './containers/Home';
import Rule from './containers/Rule';

import { fxInit, flowInit } from '../common/pageViewStat'

//路由的配置
const routes = (
  <Route component={App} >
    <Route path="/" component={Home} onEnter={routerEnter} />
    <Route path="/login" component={Login} onEnter={routerEnter} />
    <Route path="/award" component={Award} onEnter={routerEnter} />
    <Route path="/rule" component={Rule} onEnter={routerEnter} />
  </Route>
)

export default routes

function routerEnter(nextState, replace, callback){
	let {location:{query,pathname}}=nextState;

  (fxInit(), flowInit());

  callback();
}
