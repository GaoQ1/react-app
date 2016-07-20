import React from 'react';
import ReactDOM from "react-dom";
import { Router, useRouterHistory } from 'react-router';
import {Provider} from 'react-redux';
import { createHashHistory } from 'history';

import routes from './routes';
import store from './store';

import {get,post} from '../common/ceFetch'

// get('/users',{params:{a:1,b:1}})

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

ReactDOM.render(
    <Provider store={store}>
        <Router routes={routes} history={appHistory} />
    </Provider>,
    document.getElementById('root')
);
