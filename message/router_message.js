/**
* @Author: lancui
* @Date:   2016-06-24 15:06:00
* @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-06-29 00:06:36
*/

import _ from 'underscore';
import Mock from 'mockjs';
import Router from 'koa-router';
const router = new Router({
    prefix: '/api'
});

var wrap = require('co-monk');
var db = require('../common/db');
import sutil from '../common/sutil';

// 监听消息个数
require('../socket/server.js');

let messageRouter = (router) => {
    router.get('/message', sutil.login, function*(next) {
        yield sutil.render(this, {
            commonTag: 'vue',
            html: '',
            staticTag: 'api',
            noHeader: true
        });
    });

    // CURD for message
    var msgDao = wrap(db.get('message'));
    router.get('/messages', sutil.login, function* (next) {
        if (!this.parse.toUsers) {
            sutil.failed(this, 1003);
        }
        sutil.success(this,
            yield msgDao.find({toUsers: this.parse.toUsers}, {sort: {createTime:-1, status:1}})
        );
    });
    router.put('/messages', sutil.login, function* (next) {
        let _parse = this.parse;
        if (!_parse.toUsers) {
            sutil.failed(this, 1003);
        }
        let msgId = _parse.msgId;
        let query = !msgId ? {} : {_id: msgId};
        let multi = !msgId ? true : false; //批量修改

        let updateRes = yield msgDao.update(query, { $set: {status: 1}}, {multi: multi})
        sutil.success(this, updateRes);
    });

};

module.exports = messageRouter;
