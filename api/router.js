/**
 * @Author: lancui
 * @Date:   2016-06-22 12:06:00
 * @Email:  lancui@superjia.com
* @Last modified by:   geyuanjun
* @Last modified time: 2016-07-05 15:33:3
* @Last modified by:   geyuanjun
* @Last modified time: 2016-07-05 15:33:3
 */


import _ from 'underscore'
import Mock from 'mockjs'
import Router from 'koa-router'
const router = new Router({
  prefix: '/api'
})

// var wrap = require('co-monk');
// var parse = require('co-body');
// import convert from 'koa-convert';

const fs = require('fs');
const path = require('path');
var wrap = require('co-monk');
var db = require('../common/db');
var apiDao = wrap(db.get('api'));
var teamDao = wrap(db.get('team'));
var projectDao = wrap(db.get('project'));
var prdDao = wrap(db.get('prd'));
var userDao = wrap(db.get('user'));

import sutil from '../common/sutil'
import util from '../common/util.js'
import config from '../config.js'

// api 管理平台
router.get('/', sutil.prdLogin, function*(next) {
  yield sutil.render(this, {
    commonTag: 'vue',
    html: '',
    staticTag: 'api',
    noHeader: true
  });
});

// api 列表页，获取 团队，产品，prd 下拉列表的数据
router.get('/dropdown', sutil.login, function*(next) {
  let teams = yield teamDao.find({}, { fields: { _id: 0, id: 1, name: 1 } })
  let projects = yield projectDao.find({}, { fields: { _id: 0, id: 1, name: 1, teamId: 1 } })
  let prds = yield prdDao.find({}, { fields: { _id: 0, id: 1, name: 1, projectId: 1 } })

  _.each(teams, function(item) {
    item.projects = _.where(projects, { teamId: item.id })
    _.each(item.projects, pItem => {
      pItem.prds = _.where(prds, { projectId: pItem.id })
    })
  })

  sutil.success(this, teams)
});

// CURD for api
// api 列表
router.get('/apis', sutil.login, function*(next) {
    if (!this.parse.prdId) {
      sutil.failed(this, 1003);
    }
    let data = yield apiDao.find({ prdId: this.parse.prdId }, {
      fields: { _id: 0, id: 1, title: 1, url: 1, method: 1 },
      sort: { createAt: -1 }
    });
    sutil.success(this, data);
  })
  // 新建一个 api
  .post('/apis', sutil.login, function*(next) {
    if (!this.parse.apiData) {
      sutil.failed(this, 1003)
    }

    let insertResult = yield apiDao.insert(
      _.extend(this.parse.apiData, {
        id: yield sutil.genId(apiDao, 8),
        createTime: new Date(),
        updateTime: new Date(),
        userId: this.locals._user._id,
        userName: this.locals._user.username
      })
    );
    if (insertResult) {
      sutil.success(this, insertResult);
      // 添加消息，并提醒客户端
      // let userArr = [], users = yield userDao.find({teams: this.parse.apiData.teamId});
      // for(let i in users) {
      //   userArr.push(users[i].username);
      // }
      // let insertResult = yield sutil.addMessage(_parse.msgData, userArr);
    } else {
      sutil.failed(this, 150001);
    }
  })
  // 获取某个api详细信息
  .get('/apis/:id', sutil.login, sutil.setRouterParams, function*(next) {
    if (!this.parse.id) {
      sutil.failed(this, 1003);
    }
    let data = yield apiDao.findOne({ id: this.parse.id });
    sutil.success(this, data);
  })
  // 更新某个 api, 需要提供完整 api 对象
  .put('/apis/:id', sutil.login, sutil.setRouterParams, function*(next) {
    if (!this.parse.id) {
      sutil.failed(this, 1003);
    }
    let apiData = this.parse.apiData;
    delete(apiData._id)
    let updateResult = yield apiDao.update({ id: this.parse.id }, {
      $set: _.extend(apiData, {
        updateTime: new Date(),
        operatorId: this.locals._user._id,
        operatorName: this.locals._user.username
      })
    });
    if (updateResult) {
      sutil.success(this, updateResult);
      // 添加消息并发送提醒
      let userArr = [], users = yield userDao.find({teams: apiData.teamId});
      for(let i in users) {
        userArr.push(users[i].username);
      }
      // const msg = { userName: apiData.username, msgType: '1', platform: 'api', platformId: '576b401056e121e6c9ef082b', action: 'add', actionDetail: '新增消息接口', createTime: new Date };
      // let insertResult = yield sutil.addMessage(_parse.msgData, userArr);
    } else {
      sutil.failed(this, 150001);
    }
  })
  // 更新某个 api, 仅提供更新的字段
  .patch('/apis/:id', sutil.login, sutil.setRouterParams, function*(next) {
    if (!this.parse.id) {
      sutil.failed(this, 1003);
    }
    let updateResult = yield apiDao.update({ id: this.parse.id }, {
      $set: _.extend(this.parse.updateFields, {
        updateTime: new Date(),
        operatorId: this.locals._user._id,
        operatorName: this.locals._user.username
      })
    });
    if (updateResult) {
      sutil.success(this, updateResult);
    } else {
      sutil.failed(this, 150001);
    }
  })
  // 删除某个 api
  .delete('/apis/:id', sutil.login, sutil.setRouterParams, function*(next) {
    if (!this.parse.id) {
      sutil.failed(this, 1003);
    }
    let deleteResult = yield apiDao.remove({ id: this.parse.id });
    if (deleteResult) {
      sutil.success(this, deleteResult);
    } else {
      sutil.failed(this, 150002);
    }
  })


// api for mock
router.all('/fete_api/:projectId/:prdId?/mock/*', sutil.setRouterParams, sutil.allowCORS, function*(next) {
  let tmpUrlArr = this.request.path.split('/mock')
  let realUrl = tmpUrlArr[tmpUrlArr.length - 1]

  let filter = {
    url: realUrl,
    method: this.method.toUpperCase(),
    projectId: this.parse.projectId
  }
  if (this.parse.prdId) {
    filter.prdId = this.parse.prdId
  }

  let apiItem = yield apiDao.findOne(filter)
  if (apiItem) {
    let data = Mock.mock(util.mockTree2MockTemplate(apiItem.output))
      // let data = Mock.mock({
      //     "data|1-10":[
      //         {
      //             "isActive|1":true,
      //             "name|3-5":/\w/,
      //             "id|+1":1
      //         }
      //     ],
      //     "status|":1
      // });
    this.body = data // 这里就不要用 sutil 的 success 方法了
    return false
  } else {
    sutil.failed(this, 150003)
  }
})

// mock_check.js file
// must with projectId as query, like: /api/mock_check.js?projectId=123
router.get('/mock_check.js', sutil.setRouterParams, function*(next) {
  if (!this.parse.projectId) {
    this.type = 'js'
    this.body = `console.log('no projectId');`;
  } else {
    let jsContent = `
                    var feteApiProductId = '${this.parse.projectId}';
                    var feteApiHost = '${config.host}'
                    `;
    jsContent += fs.readFileSync(path.resolve('common/api_check.js'), 'utf8');
    this.type = 'js'
    this.body = jsContent;
  }
  return false;
});


export default router;
