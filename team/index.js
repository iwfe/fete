/*
 * @Author: jade
 * @Date:   2016-06-12 00:03:50
 * @Last Modified by:   jade
 * @Last Modified time: 2016-06-27 22:37:38
 */

'use strict';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {
  ReduxRouter,
} from 'redux-router';
import configureStore from './redux/configure_store';
import routers from './routers'

const store = configureStore()

render(
  <Provider store={store}>
    <ReduxRouter routes={routers} />
  </Provider>,
  document.getElementById('main')
)
