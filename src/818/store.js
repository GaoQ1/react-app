import {
    createStore,
    applyMiddleware
} from 'redux';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';

import reducer from './reducers';

const store = createStore(
    reducer,
    applyMiddleware(promiseMiddleware({
        promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']
    }), thunk, logger())
);

export default store;
