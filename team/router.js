/**
 * Created by zyy on 15/7/7.
 * zhangyuyu@superjia.com
 */
import Router from 'koa-router';
const router = new Router({
    prefix: '/team'
});

var wrap = require('co-monk');
// var parse = require('co-body');
// import convert from 'koa-convert';

var wrap = require('co-monk');
var db = require('../common/db');
var userDao = wrap(db.get('team'));

import sutil from '../common/sutil';

// 团队
router.get('/', sutil.login, function*(next) {

    yield sutil.render(this, {});
});

export default router;