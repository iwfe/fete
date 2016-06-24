/**
 * @Author: lancui
 * @Date:   2016-06-22 12:06:00
 * @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-06-24 15:06:67
 */


import _ from 'underscore';
import Mock from 'mockjs'
import Router from 'koa-router';
const router = new Router({
    prefix: '/api'
});

// var wrap = require('co-monk');
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
        html: '',
        staticTag: 'api',
        noHeader: true
    });
}).get('/message', sutil.login, function*(next) {
    yield sutil.render(this, {
        commonTag: 'vue',
        html: '',
        staticTag: 'api',
        noHeader: true
    });
});

// CURD for api
router.get('/apis', sutil.login, function*(next) {
    if (!this.parse.prdId) {
        sutil.failed(this, 1003);
    }
    let data = yield apiDao.find(
        {prdId: this.parse.prdId},
        {fields: {title: 1, url: 1, method: 1}
    });
    sutil.success(this, data);
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

// CURD for message
var msgDao = wrap(db.get('message'));
router.get('/messages', sutil.login, function* (next) {
    if (!this.parse.toUsers) {
        sutil.failed(this, 1003);
    }
    sutil.success(this, yield msgDao.find({toUsers: this.parse.toUsers}));
});


// api for mock
router.all('/mock/:productId/:prdId?/mock/*', function*(next) {
    this.parse = _.extend(this.parse, this.params);

    let tmpUrlArr = this.request.path.split('/mock');
    let realUrl = tmpUrlArr[tmpUrlArr.length - 1];

    let filter = {
        productId: this.parse.productId,
        url: realUrl
    }
    if (this.parse.prdId) {
        filter.prdId = this.parse.prdId;
    }

    let apiItems = yield apiDao.find(filter);
    if (apiItems && apiItems.length > 0) {
        let data = Mock.mock(JSON.parse(apiItems[0].outputMock));
        // 这里就不要用 sutil 的 success 方法了
        this.body = data;
        return false;
    } else {
        sutil.failed(this, 150003);
    }
});

export default router;
