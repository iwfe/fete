/**
 * Created by zyy on 15/7/7.
 * zhangyuyu@superjia.com
 */
import Router from 'koa-router';
const router = new Router();

var wrap = require('co-monk');
var parse = require('co-body');
// import convert from 'koa-convert';

var wrap = require('co-monk')
var db = require('../common/db')
var userDao = wrap(db.get('user'));

import utils from '../common/utils';

import Index from './index';
import Login from './login';

// 首页
router.get('/', function *(next) {
    var html = utils.reactRender(Index, {
        number: 2
    });
    // let user = yield userDao.findOne({
    //     username: 'jade'
    // })
    yield utils.render(this,{
        html: html,
        number: 2
    });
});

router.get('/login', function *(next) {
    // let user = yield userDao.findOne({
    //     username: 'jade'
    // })
    yield utils.render(this,{
        html: utils.reactRender(Login),
        noHeader: true
    });
});

export default router;;