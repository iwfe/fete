/**
* @Author: lancui
* @Date:   2016-06-27 13:06:00
* @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-07-14 17:07:11
*/
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import views from 'koa-views';
import mount from 'koa-mount';
import serve from 'koa-static';
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
//

// 监听message
sutil.initSocketServer(app);

app.use(function*(next) {
  this.locals = {}

  this.set({
    'Pragma': 'No-cache',
    'Cache-Control': 'no-cache'
  });
  // yield* sutil.setLoginUser(this, 'jade1', '111111');

  //sutil.getLoginUser(this);

  this.locals.host = config.host;
  this.locals.socketConnection = `${config.hostIp}:${config.socketPort}`;
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


    // // 新增消息提醒
    // if(this.path === '/message/messages' && this.method === 'POST'){
    //   let remindUsers = this.query.msgData.toUsers;
    //   serverSocket.sendMsg(remindUsers);
    // }
    // //修改消息状态提醒
    // if(this.path === '/message/messages' && this.method === 'PUT'){
    //   serverSocket.sendMsg([user.username]);
    // }

  } catch (error) {
    this.status = error.status || 500;
    console.log(error.stack);
    if (this.status === 404) {
      yield this.render('error', {
        error
      });
    } else {
      yield this.render('error', {
        error
      });
    }
  }
});

import main from './main/router';
import user from './user/router';
import team from './team/router';
import project from './project/router';
import prd from './prd/router';
import apiModule from './api/router';
import msgModule from './message/router';
import importdb from './importdb/router';
app.use(main.routes());
app.use(user.routes());
app.use(team.routes());
app.use(project.routes());
app.use(prd.routes());
app.use(apiModule.routes());
app.use(msgModule.routes());
app.use(importdb.routes());

app.on('error', function(err) {
    console.log('sent error %s to the cloud', err.message);
    console.log(err);
});

module.exports = app;
