/**
* @Author: lancui
* @Date:   2016-06-24 15:06:00
* @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-07-01 19:07:25
*/

const wrap = require('co-monk');
const db = require('../common/db');
import sutil from '../common/sutil';
import Router from 'koa-router';

const router = new Router({
  prefix: '/message'
});

// CURD for message
const msgDao = wrap(db.get('message'));
const userMsgDao = wrap(db.get('userMessage'));
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
    let uid = this.parse.userId;
    if (!uid) {
        sutil.failed(this, 1003);
    }
    let msgs = yield msgDao.find({toUsers: uid}, {sort: {createTime:-1, status:1}});
    let userMsgs = yield userMsgDao.find({userId: uid});
    let umMap = {};
    for(let i in userMsgs) {
      let um = userMsgs[i];
      umMap[um.msgId] = um.status;
    }
    for(let j in msgs) {
      msgs[j].status = umMap[msgs[j].id];
    }
    sutil.success(this, msgs);
});

// 更新用户消息状态为已读，如果没有传msgId，则更新所有消息状态为已读
router.put('/messages', sutil.login, function* (next) {
    let _parse = this.parse, uid = _parse.userId;
    if (!_parse.userId) {
        sutil.failed(this, 1003);
    }
    let msgId = _parse.msgId;
    let query = !msgId ? {userId: uid} : {userId: uid, msgId: msgId};
    let multi = !msgId ? true : false; //批量修改
    let updateRes = yield userMsgDao.update(query, { $set: {status: 1}}, {multi: multi});
    sutil.success(this, updateRes);
});

// 新增消息
router.post('/messages', sutil.login, function* (next) {
    let _parse = this.parse;
    if (!_parse.userId) {
        sutil.failed(this, 1003);
    }
    _parse.msgData.id = yield sutil.genId(msgDao, 10);
    let insertResult = yield msgDao.insert(_parse.msgData);
    // 添加用户信息表
    let toUsers = _parse.msgData.toUsers;
    if(toUsers.length > 0) {
      for(let i in toUsers) {
        yield userMsgDao.insert({msgId: insertResult.id, userId: toUsers[i], status: 0 });
      }
    }

    if (insertResult) {
        sutil.success(this, insertResult);
    } else {
        sutil.failed(this, 150001);
    }
});


export default router;
