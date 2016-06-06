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

import utils from '../common/utils';

import Index from './index';

// 团队
router.get('/(.*)', function*(next) {
    
    yield utils.render(this, {
    });
});

export default router;;
