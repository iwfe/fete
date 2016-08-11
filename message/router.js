/**
* @Author: lancui
* @Date:   2016-06-24 15:06:00
* @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-08-08 22:08:35
*/

const wrap = require('co-monk')
const db = require('../common/db')
import sutil from '../common/sutil'
import Router from 'koa-router'

const router = new Router({
  prefix: '/message'
})

// CURD for message
const msgDao = wrap(db.get('message'))
const userDao = wrap(db.get('user'))
router.get('/', sutil.login, function*(next) {
    yield sutil.render(this, {
        commonTag: 'vue',
        html: '',
        staticTag: 'message',
        noHeader: true
    })
})

// 获取用户的所有消息
router.get('/messages', sutil.login, function* (next) {
    /**
     * userId: 需要推送过去的人的userId
     * pageSize: 每一页所需要的消息条数
     * pageIndex: 需要的是第几页的数据
     */
    let [uid, pageSize, pageIndex] = [this.parse.userId, this.parse.pageSize, this.parse.pageIndex]
    if (!uid) {
        sutil.failed(this, 1003)
    }

    let msgs = yield msgDao.find({'toUsers.userId': uid}, {sort: {createTime:-1, status:1}, limit: pageSize, skip: (pageIndex - 1)*pageSize})
    let count = yield msgDao.count({'toUsers.userId': uid})
    for(let j in msgs) {
      let status = 0, toUsers = msgs[j].toUsers
      for(let i in toUsers){
        let tu = toUsers[i]
        if(tu.userId === uid){
          msgs[j].status = tu.status
          const statusMap = { 0: '未读', 1: '已读', 2: (!tu.resultText ? '已操作' : tu.resultText) }
          // console.log(`tu.resultText===${tu.resultText}`)
          msgs[j].resultText = statusMap[tu.status]
          break
        }
      }
    }
    let message = {
      msgs,
      count
    }
    sutil.success(this, message)
})

// 更新用户消息状态为已读，如果没有传msgId，则更新所有消息状态为已读
router.put('/messages', sutil.login, function* (next) {
    let _parse = this.parse, uid = _parse.userId
    if (!_parse.userId) {
        sutil.failed(this, 1003)
    }
    let {msgId, status, resultText} = _parse
    // 如果msgId＝null，则只更新action不等于'invited'的状态为已读
    let query = !msgId ? {'toUsers.userId': uid, action: {$nin: ['invited']}} : {'toUsers.userId': uid, id: msgId}
    let multi = !msgId ? true : false //批量修改
    let updateRes = yield msgDao.update(query, { $set: {'toUsers.$.status': status, 'toUsers.$.resultText': resultText}}, {multi: multi})

    //更新消息
    sutil.updateClientMsg([uid])

    sutil.success(this, updateRes)
})

// 新增消息
router.post('/messages', sutil.login, function* (next) {
    let _parse = this.parse
    if (!_parse.userId) {
        sutil.failed(this, 1003)
    }
    // 添加消息，并提醒客户端
    let insertResult = yield sutil.addMessage(_parse.msgData, null, ['lancui'])

    if (insertResult) {
        sutil.success(this, insertResult)
    } else {
        sutil.failed(this, 150001)
    }
})
// 删除消息
router.delete('/messages', sutil.login, function* (next) {
    let _parse = this.parse, userIds = _parse.userIds
    if (!userIds) {
        sutil.failed(this, 1003)
    }
    let delResult = yield msgDao.remove({id: {$in: userIds.split(',')}})

    if (delResult) {
        sutil.success(this, delResult)
    } else {
        sutil.failed(this, 150001)
    }
})


export default router
