/**
* @Author: lancui
* @Date:   2016-06-24 15:06:00
* @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-08-09 11:08:20
*/

const wrap = require('co-monk')
const db = require('../../common/db')
import sutil from '../../common/sutil'
import Router from 'koa-router'

const router = new Router({
  prefix: '/calendar'
})

// CURD
const userDao = wrap(db.get('user'))
const prdDao = wrap(db.get('prd'))
const projectDao = wrap(db.get('project'));

router.get('/', sutil.login, function*(next) {
    yield sutil.render(this, {
        commonTag: 'vue',
        html: '',
        staticTag: 'calendar',
        noHeader: true
    })
})

router.get('/events', sutil.login, function* (next) {
  let [user, prjMap] = [this.locals._user, {}]
  const teamIds = user.teams.map((val) => {
    return val.id
  })
  // 查找用户相关的prd
  const prds = yield prdDao.find({
    teamId: {'$in': teamIds}
  })
  // 查找用户相关的项目
  const prjs = yield projectDao.find({
    teamId: {'$in': teamIds}
  })
  prjs.forEach((prj) => {
    prjMap[prj.id] = prj.name
  })
  
  // 设置项目名称
  prds.forEach((prd) => {
    const prjName = prjMap[prd.projectId]
    prd.projectName = !prjName ? '' : prjName
  })

  const res = {
    status: 0,
    data: prds
  }
  sutil.success(this, res)
})

// // 获取用户的所有消息
// router.get('/messages', sutil.login, function* (next) {
//     /**
//      * userId: 需要推送过去的人的userId
//      * pageSize: 每一页所需要的消息条数
//      * pageIndex: 需要的是第几页的数据
//      */
//     let [uid, pageSize, pageIndex] = [this.parse.userId, this.parse.pageSize, this.parse.pageIndex]
//     if (!uid) {
//         sutil.failed(this, 1003)
//     }
//     let msgs = yield msgDao.find({'toUsers.userId': uid}, {sort: {createTime:-1, status:1}, limit: pageSize, skip: (pageIndex - 1)*pageSize})
//     let count = yield msgDao.count({'toUsers.userId': uid})
//
//     for(let j in msgs) {
//       let status = 0, toUsers = msgs[j].toUsers
//       for(let i in toUsers){
//         let tu = toUsers[i]
//         if(tu.userId === uid){
//           msgs[j].status = tu.status
//           const statusMap = { 0: '未读', 1: '已读', 2: (!tu.resultText ? '已操作' : tu.resultText) }
//           // console.log(`tu.resultText===${tu.resultText}`)
//           msgs[j].resultText = statusMap[tu.status]
//           break
//         }
//       }
//     }
//     let message = {
//       msgs,
//       count
//     }
//     sutil.success(this, message)
// })

export default router
