import Router from 'koa-router';
const router = new Router({
    prefix: '/api'
});

var wrap = require('co-monk');
// var parse = require('co-body');
// import convert from 'koa-convert';

var wrap = require('co-monk');
var db = require('../common/db');
var apiDao = wrap(db.get('api'));

import sutil from '../common/sutil';

// api 管理平台
router.get('/', sutil.login, function* (next) {
    yield sutil.render(this, {
        commonTag: 'vue',
        html: '<router-view></router-view>',
        staticTag: 'api',
        noHeader: true
    });
});

// CURD api demo
router.get('/data', sutil.login, function* (next) {
    // yield sutil.success(this, {success: 'aa'});
    sutil.success(this, yield apiDao.find({}));
});
router.post('/data', sutil.login, function* (next) {
    let insertResult = yield apiDao.insert({
        title: 'test',
        url: '/api/test/list',
        method: 'get',
        input: '{"a": "a", "b": 1}',
        output: '{"msg": "aa", "err_code": 0}',
        create_time: new Date(),
        update_time: new Date()
    });
    if (insertResult) {
        sutil.success(this, {msg: 'add success', err_code: 0});
    } else {
        sutil.failed(this, {msg: 'add failed', err_code: -1});
    }
});
router.put('/data', sutil.login, function* (next) {
    yield sutil.success(this, {success: 'aa'});
});
router.delete('/data', sutil.login, function* (next) {
    yield sutil.success(this, {success: 'aa'});
});


//
export default router;