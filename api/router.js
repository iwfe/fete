/**
 * @Author: lancui
 * @Date:   2016-06-22 12:06:00
 * @Email:  lancui@superjia.com
 * @Last modified by:   lancui
 * @Last modified time: 2016-06-24 15:06:05
 */


import _ from 'underscore';
import Mock from 'mockjs';
import Router from 'koa-router';
const router = new Router({
  prefix: '/api'
});

// var wrap = require('co-monk');
// var parse = require('co-body');
// import convert from 'koa-convert';

const fs = require('fs');
const path = require('path');
var wrap = require('co-monk');
var db = require('../common/db');
var apiDao = wrap(db.get('api'));
var teamDao = wrap(db.get('team'));
var productDao = wrap(db.get('product'));
var prdDao = wrap(db.get('prd'));

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

// api 列表页，获取 团队，产品，prd 下拉列表的数据
router.get('/dropdown', sutil.login, function*(next) {
  let teams = yield teamDao.find({}, { fields: { name: 1 } });
  // _.each(teams, function (item) {
  //     item.products = yield productDao.find({}, {fields: {name: 1}});
  //     _.each(item.products, pItem => {
  //         pItem.prds = yield prdDao.find({}, {fields: {name: 1}});
  //     });
  // })
  sutil.success(this, teams);
});

// CURD for api
router.get('/apis', sutil.login, function*(next) {
    if (!this.parse.prdId) {
      sutil.failed(this, 1003);
    }
    let data = yield apiDao.find({ prdId: this.parse.prdId }, {
      fields: { title: 1, url: 1, method: 1 },
      sort: { createAt: -1 }
    });
    sutil.success(this, data);
  })
  .post('/apis', sutil.login, function*(next) {
    let insertResult = yield apiDao.insert(
      _.extend(this.parse.apiData, {
        createTime: new Date,
        updateTime: new Date,
        operatorId: this.locals._user._id,
        operatorName: this.locals._user.username
      })
    );
    if (insertResult) {
      sutil.success(this, insertResult);
    } else {
      sutil.failed(this, 150001);
    }
  })
  .put('/apis', sutil.login, function*(next) {
    let updateResult = yield apiDao.update({ id: this.parse.apiData.id }, {
      $set: _.extend(this.parse.apiData, {
        updateTime: new Date,
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
  .delete('/apis', sutil.login, function*(next) {
    if (!this.parse.apiId) {
      sutil.failed(this, 1003);
    }
    let deleteResult = yield apiDao.remove({ _id: this.parse.apiId });
    if (insertResult) {
      sutil.success(this, deleteResult);
    } else {
      sutil.failed(this, 150002);
    }
  });

// api for mock
router.all('/fete_api/:productId/:prdId?/mock/*', sutil.setRouterParams, function*(next) {
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

// mock_check.js file
// must with productId as query, like: /api/mock_check.js?productId=123
router.get('/mock_check.js', sutil.setRouterParams, function*(next) {
  if (!this.parse.productId) {
    this.type = '.js'
    this.body = `console.log('no productId');`;
  } else {
    this.type = '.js'
    this.body = fs.readFileSync(path.resolve('common/api_check.js'), 'utf8');
  }
  return false;
});

// message router
var messageRouter = require('./router_message.js');
messageRouter(router);

export default router;
