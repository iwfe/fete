/*
 * @Author: jade
 * @Date:   2016-06-26 21:51:22
 * @Last Modified by:   jade
 * @Last Modified time: 2016-06-27 22:38:11
 */

'use strict';
import { createStore, compose, applyMiddleware } from 'redux';
import {
  reduxReactRouter,
} from 'redux-router';
import { createHistory } from 'history';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './reducer';


const createStoreWithMiddleware = compose(
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  ),
  reduxReactRouter({ createHistory })
  // devTools()
)(createStore);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState)

    // if (module.hot) {
    //     // Enable Webpack hot module replacement for reducers
    //     module.hot.accept('../reducers', () => {
    //         const nextRootReducer = require('../reducers')
    //         store.replaceReducer(nextRootReducer)
    //     })
    // }

    return store
}
