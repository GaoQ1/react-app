import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import {Provider} from 'react-redux';

import '../common/flexible'; //手淘flexible库

import routes from './routes';
import store from './store';
import fastclick from 'fastclick'

import {gaInit} from '../common/pageViewStat'
import {bindTitle} from '../common/HybirdAPI/UtilityApi'
initFastClick();//解决ios点击延迟
gaInit()//统计代码部署
bindTitle('818提前购活动入场券');//hybird app设置标题

//sdfasfasdfas
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
}
