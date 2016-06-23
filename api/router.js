/**
 * @Author: lancui
 * @Date:   2016-06-22 12:06:00
 * @Email:  lancui@superjia.com
 * @Last modified by:   lancui
 * @Last modified time: 2016-06-22 13:06:65
 */


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
router.get('/', sutil.login, function*(next) {
    yield sutil.render(this, {
        commonTag: 'vue',
        html: '<router-view></router-view>',
        staticTag: 'api',
        noHeader: true
    });
});

// CURD for api
router.get('/apis', sutil.login, function*(next) {
    if (!this.parse.prdId) {
        sutil.failed(this, 1003);
    }
    sutil.success(this, yield apiDao.find({prdId: this.parse.prdId}));
});
router.post('/apis', sutil.login, function*(next) {
    let insertResult = yield apiDao.insert(
        _.extend(this.parse.apiData, {
                createAt: new Date,
                operatorId: this.local._user._id,
                operatorName: this.local._user.username
            }
        )
    );
    if (insertResult) {
        sutil.success(this, insertResult);
    } else {
        sutil.failed(this, 150001);
    }
});
router.put('/apis', sutil.login, function*(next) {
    yield sutil.success(this, {success: 'aa'});
});
router.delete('/apis', sutil.login, function*(next) {
    if (!this.parse.apiId) {
        sutil.failed(this, 1003);
    }
    let deleteResult = yield apiDao.remove({_id: this.parse.apiId});
    if (insertResult) {
        sutil.success(this, deleteResult);
    } else {
        sutil.failed(this, 150002);
    }
});


export default router;
