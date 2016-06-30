/**
 * @Author: lancui
 * @Date:   2016-06-27 13:06:00
 * @Email:  lancui@superjia.com
 * @Last modified by:   lancui
 * @Last modified time: 2016-06-29 15:06:16
 */


import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import views from 'koa-views';
import mount from 'koa-mount';
import serve from 'koa-static';
import co from 'co';
import config from './config';
import sutil from './common/sutil';
import _ from 'underscore';
// import parse from 'co-body';
// var parse = require('co-body')
// import finalHandler from './lib/finalHandler';
// import router from './router';

const app = new Koa();

// var redisStore = require('koa-redis');

// middleware
app.use(views(`${__dirname}/view`, {
  extension: 'jade'
}));
app.use(logger());

app.use(mount('/static', serve('dist')));
app.use(bodyParser());

app.proxy = true;

app.keys = ['fete'];
// app.use(session({
//     key: 'iwfe',
//     prefix: 'user-',
//     rolling: true,
//     cookie: {
//         path: '/',
//         httpOnly: true,
//         maxage: 1000 * 60 * 60 * 24 * 7,
//         rewrite: true,
//         signed: false
//     }
//     // store: redisStore(config.redis)
// }));
//
//

app.use(function*(next) {
  this.locals = {}

  this.set({
    'Pragma': 'No-cache',
    'Cache-Control': 'no-cache'
  });
  // yield* sutil.setLoginUser(this, 'jade1', '111111');

  //sutil.getLoginUser(this);

  this.locals._now = new Date().getTime();
  let p = this.query;
  try {
    p = _.extend(p, this.request.body, this.params);
  } catch (e) {

  }

  this.parse = p;
  var user = _.extend({}, yield * sutil.getLoginUser(this));
  delete user.password;
  this.locals._user = user;
  try {
    yield next;
    // Handle 404 upstream.
    var status = this.status || 404;
    if (status === 404) this.throw(404);
  } catch (error) {
    this.status = error.status || 500;
    if (this.status === 404) {
      yield this.render('error', {
        error
      });
    } else {
      yield this.render('error', {
        error
      });
    }
    this.app.emit('error', error, this);
  }
});

import main from './main/router';
import team from './team/router';
import apiModule from './api/router';
import msgModule from './message/router';
app.use(main.routes());
app.use(team.routes());
app.use(apiModule.routes());
app.use(msgModule.routes());

app.on('error', function (err) {
  console.log('sent error %s to the cloud', err.message);
  console.log(err);
});

module.exports = app;
