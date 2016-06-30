/**
 * @Author: lancui
 * @Date:   2016-06-22 12:06:00
 * @Email:  lancui@superjia.com
* @Last modified by:   geyuanjun
* @Last modified time: 2016-06-30 19:06:35
* @Last modified by:   geyuanjun
* @Last modified time: 2016-06-30 19:06:35
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
var productDao = wrap(db.get('product'));
var prdDao = wrap(db.get('prd'));

import sutil from '../common/sutil'
import util from '../common/util.js'
import config from '../config.js'

// api 管理平台
router.get('/', sutil.login, function*(next) {
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
  let products = yield productDao.find({}, { fields: { _id: 0, id: 1, name: 1, teamId: 1 } })
  let prds = yield prdDao.find({}, { fields: { _id: 0, id: 1, name: 1, productId: 1 } })

  _.each(teams, function (item) {
      item.products = _.where(products, {teamId: item.id})
      _.each(item.products, pItem => {
          pItem.prds = _.where(prds, {productId: pItem.id})
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
    delete(this.parse.apiData._id)
    let updateResult = yield apiDao.update({ id: this.parse.id }, {
      $set: _.extend(this.parse.apiData, {
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
router.all('/fete_api/:productId/:prdId?/mock/*', sutil.setRouterParams, sutil.allowCORS, function*(next) {
  let tmpUrlArr = this.request.path.split('/mock')
  let realUrl = tmpUrlArr[tmpUrlArr.length - 1]

  let filter = {
    url: realUrl,
    method: this.method.toUpperCase(),
    productId: this.parse.productId
  }
  if (this.parse.prdId) {
    filter.prdId = this.parse.prdId
  }

  let apiItem = yield apiDao.findOne(filter)
  if (apiItem) {
    let data = Mock.mock(mockTree2MockTemplate(apiItem.output))
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
// must with productId as query, like: /api/mock_check.js?productId=123
router.get('/mock_check.js', sutil.setRouterParams, function*(next) {
  if (!this.parse.productId) {
    this.type = 'js'
    this.body = `console.log('no productId');`;
  } else {
    let jsContent = `
                    var feteApiProductId = '${this.parse.productId}';
                    var feteApiHost = '${config.host}'
                    `;
    jsContent += fs.readFileSync(path.resolve('common/api_check.js'), 'utf8');
    this.type = 'js'
    this.body = jsContent;
  }
  return false;
});


export default router;
