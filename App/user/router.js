/**
 * Created by zyy on 15/7/7.
 * zhangyuyu@superjia.com
 */
import Router from 'koa-router';
const router = new Router({
    prefix: '/user'
});

var wrap = require('co-monk');
// var parse = require('co-body');
// import convert from 'koa-convert';

var wrap = require('co-monk');
var db = require('../common/db');
var userDao = wrap(db.get('user'));

import util from '../common/util';
import sutil from '../common/sutil';

import Index from './index';

router.get('/data', function*(next) {
  const username = this.parse.username;
  const user = yield userDao.findOne({
    username: username
  });
  if(user) {
    sutil.success(this, sutil.wrapUser(user, ['teams']));
  }else {
    sutil.failed(this, 10004);
  }

});
// 首页
// router.get('/profile', function*(next) {
//     var html = utils.reactRender(Index, {
//         number: 2
//     });
//     // let user = yield userDao.findOne({
//     //     username: 'jade'
//     // })
//     yield utils.render(this, {
//         html: html,
//         number: 2
//     });
// });

export default router;;
