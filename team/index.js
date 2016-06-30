/*
 * @Author: jade
 * @Date:   2016-06-12 00:03:50
 * @Last Modified by:   jade
 * @Last Modified time: 2016-06-27 22:37:38
 */

'use strict';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './redux/app';
import configureStore from './redux/configure_store';

const store = configureStore()

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('main')
)
