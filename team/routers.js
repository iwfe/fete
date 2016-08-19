/**
 * Created by zyy on 16/7/2.
 * zhangyuyu@superjia.com
 */

'use strict';
import React from 'react';
import { IndexRoute, Route, Router } from 'react-router';
import App from './redux/app';
import Detail from './redux/Detail';

export default (
  <div>
    <Route path="/team" component={App}>
    </Route>
    <Route path="/team/:teamId" component={Detail}>
    </Route>
  </div>
);
