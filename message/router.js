/**
* @Author: lancui
* @Date:   2016-06-24 15:06:00
* @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-06-29 15:06:13
*/

const wrap = require('co-monk');
const db = require('../common/db');
import sutil from '../common/sutil';
import Router from 'koa-router';

// 监听消息个数
require('../socket/server.js');

const router = new Router({
  prefix: '/message'
});

// CURD for message
const msgDao = wrap(db.get('message'));
router.get('/', sutil.login, function*(next) {
    yield sutil.render(this, {
        commonTag: 'vue',
        html: '',
        staticTag: 'message',
        noHeader: true
    });
});

// 获取用户的所有消息
router.get('/messages', sutil.login, function* (next) {
    if (!this.parse.toUsers) {
        sutil.failed(this, 1003);
    }
    sutil.success(this,
        yield msgDao.find({toUsers: this.parse.toUsers}, {sort: {createTime:-1, status:1}})
    );
});

// 更新用户消息状态为已读，如果没有传msgId，则更新所有消息状态为已读
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

// 新增消息
router.post('/messages', sutil.login, function* (next) {
    let _parse = this.parse;
    if (!_parse.toUsers) {
        sutil.failed(this, 1003);
    }
    let insertResult = yield msgDao.insert(this.parse.msgData);
    if (insertResult) {
        sutil.success(this, insertResult);
    } else {
        sutil.failed(this, 150001);
    }
});


export default router;
