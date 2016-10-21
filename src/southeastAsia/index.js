import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import {Provider} from 'react-redux';

import '../common/flexible';

import routes from './routes';
import store from './store';
import fastclick from 'fastclick';

import styles from '../../public/southeastAsia/less/index.less';

import {gaInit} from '../common/pageViewStat';
initFastClick();//解决ios点击延迟
gaInit()//统计代码部署

ReactDOM.render(
    <Provider store={store}>
        <Router routes={routes} history={hashHistory} />
    </Provider>,
    document.getElementById('root')
);

function initFastClick(){
	document.addEventListener('DOMContentLoaded', function() {
		fastclick.attach(document.body);
	}, false);
};
