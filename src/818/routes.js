import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import Topay from './containers/Topay';
import Payment from './containers/Payment';

//路由的配置
const routes = (
  <Route component={App}>
    <Route path="/" component={Home} />
    <Route path="/topay" component={Topay} />
    <Route path="/payment" component={Payment} />
  </Route>
)

export default routes
