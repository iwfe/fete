/**
 * @Author: lancui
 * @Date:   2016-06-22 12:06:00
 * @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-08-19 19:08:09
* @Last modified by:   lancui
* @Last modified time: 2016-08-19 19:08:09
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
var db = require('../../common/db');
var apiDao = wrap(db.get('api'));
var teamDao = wrap(db.get('team'));
var projectDao = wrap(db.get('project'));
var prdDao = wrap(db.get('prd'));
var userDao = wrap(db.get('user'));

import sutil from '../../common/sutil'
import util from '../../common/util.js'
import config from '../../config.js'

// api 管理平台
router.get('/', sutil.prdLogin, function*(next) {
  yield sutil.render(this, {
    commonTag: 'vue',
    html: '',
    staticTag: 'api',
    noHeader: true
  });
}).get('/j2j', sutil.login, function*(next) {
  yield sutil.render(this, {
    commonTag: 'vue',
    html: '',
    staticTag: 'api',
    noHeader: true
  });
});

// CURD for api
// api 列表
router.get('/apis', sutil.prdLogin, function*(next) {
    if (!this.parse.prdId) {
      sutil.failed(this, 1003)
    }
    let data = yield apiDao.find({ prdId: this.parse.prdId }, {
      fields: { _id: 0, id: 1, title: 1, url: 1, method: 1, updateDescList: 1, createTime: 1, updateTime: 1 },
      sort: { updateTime: -1 }
    })
    let [categories, obj] = [[], {}]
    _.each(data, item => {
      let last = item.updateDescList[0] // last one is at 0, not .length-1
      if (_.indexOf(categories, item.category) > -1) {
        categories.push(item.category)
      }
      item.lastModify = `${util.formateDate(last.updateTime, '%F %T')} ${last.userName} ${last.updateDesc}`
      delete item.updateDescList
    })
    // 在返回的数据中创建categories这个数组
    obj.data = data
    obj.categories = categories
    sutil.success(this, obj)
  })
  // 新建一个 api
  .post('/apis', sutil.prdLogin, function*(next) {
    if (!this.parse.apiData) {
      sutil.failed(this, 1003)
    }
    let apiData = this.parse.apiData, _user = this.locals._user;

    let _now = Date.now();
    _.extend(apiData, {
      id: yield sutil.genId(apiDao, 8),
      createTime: _now,
      updateTime: _now,
      userId: _user._id,
      userName: _user.username,
      updateDescList: [{ updateTime: _now, userName: _user.username, updateDesc: apiData.updateDesc }]
    });
    delete apiData.updateDesc; // 不保存到数据库

    let insertResult = yield apiDao.insert(apiData);
    if (insertResult) {
      sutil.success(this, insertResult);
      // 添加消息，并提醒客户端
      let msg = { userName: _user.username, msgType: '1', platform: 'api', platformId: insertResult.id, action: 'add', actionDetail: { message: apiData.updateDescList[0].updateDesc}, createTime: _now };
      yield sutil.addMessage(msg, apiData.teamId);
    } else {
      sutil.failed(this, 150001);
    }
  })
  // 获取某个api详细信息
  .get('/apis/:id', sutil.setRouterParams, sutil.prdLogin, function*(next) {
    if (!this.parse.id) {
      sutil.failed(this, 1003);
    }
    let data = yield apiDao.findOne({ id: this.parse.id });
    sutil.success(this, data);
  })
  // 更新某个 api, 需要提供完整 api 对象
  .put('/apis/:id', sutil.setRouterParams, sutil.prdLogin, function*(next) {
    let param = this.parse;
    if (!param.id) {
      sutil.failed(this, 1003);
    }
    let apiData = param.apiData, isAddMsg = !!apiData.updateDesc;
    delete(apiData._id)

    let _now = Date.now(), _user = this.locals._user;
    if (!!apiData.updateDesc) { // 如果没重要修改，updateDesc可以为空
      apiData.updateDescList.unshift({ updateTime: _now, userName: _user.username, updateDesc: apiData.updateDesc })
    }
    delete apiData.updateDesc; // 不保存到数据库

    let updateResult = yield apiDao.update({ id: param.id }, {
      $set: _.extend(apiData, {
        updateTime: _now,
        operatorId: _user._id,
        operatorName: _user.username
      })
    });
    if (updateResult) {
      sutil.success(this, updateResult);
      // 添加消息，并提醒客户端
      if (isAddMsg) {
        let msg = { userName: _user.username, msgType: '1', platform: 'api', platformId: updateResult.id, action: 'update', actionDetail: { message: apiData.updateDescList[0].updateDesc }, createTime: _now };
        yield sutil.addMessage(msg, apiData.teamId);
      }
    } else {
      sutil.failed(this, 150001);
    }
  })
  // 更新某个 api, 仅提供更新的字段
  .patch('/apis/:id', sutil.setRouterParams, sutil.prdLogin, function*(next) {
    if (!this.parse.id) {
      sutil.failed(this, 1003);
    }
    let updateResult = yield apiDao.update({ id: this.parse.id }, {
      $set: _.extend(this.parse.updateFields, {
        updateTime: Date.now(),
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
  .delete('/apis/:id', sutil.setRouterParams, sutil.prdLogin, function*(next) {
    if (!this.parse.id) {
      sutil.failed(this, 1003);
    }
    let api = yield apiDao.findOne({ id: this.parse.id });
    let deleteResult = yield apiDao.remove({ id: this.parse.id });
    if (deleteResult) {
      sutil.success(this, deleteResult);

      // 添加消息，并提醒客户端
      let msg = { userName: this.locals._user.username, msgType: '1', platform: 'api', platformId: this.parse.id, action: 'delete', actionDetail: { message: `删除API接口:${api.title}:${api.url}` }, createTime: new Date };
      yield sutil.addMessage(msg, api.teamId);
    } else {
      sutil.failed(this, 150002);
    }
  })

  // 根据prdId获取最新的API
  .get('/getLatestApi', sutil.setRouterParams, sutil.prdLogin, function*(next) {
    if (!this.parse.prdId) {
      sutil.failed(this, 1003)
    }
    let api = yield apiDao.findOne({ prdId: this.parse.prdId }, { sort: { createTime: -1 } })
    if (api) {
      sutil.success(this, api)
    } else {
      sutil.success(this, {}) // 防止页面报“API不存在”这个错误
    }
  })

  // 更新最新的API root 字段
  .patch('/apiRoot', sutil.setRouterParams, sutil.prdLogin, function*(next) {
    if (!this.parse.prdId && !this.parse.apiRoot) {
      sutil.failed(this, 1003)
    }
    let updateResult = yield apiDao.update({ prdId: this.parse.prdId }, {
      $set: { root: this.parse.apiRoot }
    },  { multi: true })
    sutil.success(this, 'API ROOT 更新成功！')
  })

// api for mock
router.all('/fete_api/:projectId/:prdId?/mock*', sutil.setRouterParams, sutil.allowCORS, function*(next) {
  let realUrl = this.parse['0']
  console.log(realUrl)
  let filter = {
    method: this.method.toUpperCase(),
    projectId: this.parse.projectId
  }
  if (this.parse.prdId) {
    filter.prdId = this.parse.prdId
  }

  let apiItems = yield apiDao.find(filter, {
    fields: { _id: 0, id: 1, url: 1, root: 1, createTime: 1 },
    sort: { createTime: -1 }
  })
  console.log(apiItems)

  if (apiItems && apiItems.length > 0) {
    let apiItem = _.find(apiItems, item => {
      return (item.root ? item.root : '') + item.url === realUrl
    })
    console.log(apiItem);
    if (apiItem && apiItem.id) {
      apiItem = yield apiDao.findOne({ id: apiItem.id })
      // if use outputJson
      if (apiItem.useOutputJson) {
        this.body = apiItem.outputJson
        return false
      }
      let data = Mock.mock(util.mockTree2MockTemplate(apiItem.output))
      // 这里就不要用 sutil 的 success 方法了
      // jquery jsonp has callback&_ but vue-resource just have callback
      if (this.parse.callback) {
        this.body = `${this.parse.callback}(${JSON.stringify(data)})` // for jsonp
      } else {
        this.body = data  // for json
      }
      return false
    }
  }

  sutil.failed(this, 150003)
})

// mock_check.js file
// must with projectId as query, like: /api/mock_check.js?useMockData=true&projectId=123
router.get('/mock_check.js', sutil.setRouterParams, function*(next) {
  if (!this.parse.projectId) {
    this.type = 'js'
    this.body = `console.log('no projectId');`;
  } else {

    let jsContent = `
                    var feteApiProjectId = '${this.parse.projectId}';
                    var feteApiUseMockData = ${this.parse.useMockData === 'true' ? true : false};
                    var feteApiHost = '${config.host}';
                    var feteApiForMock = {};
                    `;
    jsContent += fs.readFileSync(path.resolve('common/api_check.js'), 'utf8')
    this.type = 'js'
    this.body = jsContent
  }
  return false
})
router.get('/api_mock_data', sutil.setRouterParams, sutil.allowCORS, function*(next) {
  if (!this.parse.projectId) {
    sutil.failed(this, 1003)
  } else {
    let apiItems = yield apiDao.find({ projectId: this.parse.projectId }, {
      fields: { _id: 0, url: 1, method: 1, inputModel: 1, output: 1, root: 1 },
      sort: { createAt: 1 }
    })
    let allApiForMock = {}
    _.each(apiItems, item => {
      allApiForMock[item.method + item.root + item.url] = {
        inputModel: item.inputModel,
        output: item.output
      }
    })
    sutil.success(this, allApiForMock)
  }
})

export default router;
