/**
* @Author: lancui
* @Date:   2016-06-24 15:06:00
* @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-07-17 09:07:25
*/

// old database
import config from '../../config';
var monk = require('monk');
var old_db = monk('localhost/iwfe');

const wrap = require('co-monk');
const db = require('../../common/db');
import sutil from '../../common/sutil';
import util from '../../common/util';
import Router from 'koa-router';

const router = new Router({
  prefix: '/importdb'
});

// CURD for message
const old_apiDao = wrap(old_db.get('api-api'));
const old_prdDao = wrap(old_db.get('api-prd'));
const apiDao = wrap(db.get('api'));
router.get('/', sutil.login, function*(next) {
    yield sutil.render(this, {
        commonTag: 'vue',
        html: '',
        staticTag: 'importdb',
        noHeader: true
    });
});

// 更新用户消息状态为已读，如果没有传msgId，则更新所有消息状态为已读
router.put('/importdata', sutil.login, function* (next) {
    let self = this, _parse = this.parse, uid = _parse.userId;
    if (!_parse.userId) {
        sutil.failed(this, 1003);
    }

    function* initApi(oldApi, root, teamId, projectId, prdId) {
      let old_output = JSON.parse(oldApi.output),
          new_output = util.Json2MockTree(old_output);

      let newApi = {
        id: yield sutil.genId(apiDao, 8),
        createTime: new Date(),
        updateTime: new Date(),
        userId: self.locals._user._id,
        userName: self.locals._user.username,

        title: oldApi.desc, // 标题
        url: oldApi.url, // 请求url
        method: oldApi.method.toLocaleUpperCase(), //提交方式 (get post)
        input: JSON.parse(oldApi.input), // 入参
        output: new_output,
        outputJson: old_output,
      	status: 1,	// 1 新建， 2 修改
      	updateDescList: [{ // 修改说明list
      		updateTime: new Date, // 更新时间
      		userName: self.locals._user.username, // 用户名
      		updateDesc: '迁移接口' // 更新说明
      	}],
      	root: root, // 如 weixinEnt
      	prdId: prdId, // PrdID
      	projectId: projectId, // 项目Id
      	teamId: teamId // 项目组Id
      };
      return newApi;
    }

    let root = _parse.root, teamId = _parse.teamId, projectId = _parse.projectId, prdId = _parse.prdId, oldPrdId = _parse.oldPrdId;
    console.log(`${root} ${teamId} ${projectId} ${prdId} ${oldPrdId}`);

    let opidArr = oldPrdId.replace(/ /g, '').replace(/，/g, ',').split(",");
    let count = 0, resApis=[];
    for (let j in opidArr) {
      let oldpid = opidArr[j];
      let opid = yield old_prdDao.find({'uuid': oldpid});
      if(!opid || opid.length == 0) break;
      let oldApis = yield old_apiDao.find({'prdId': opid[0]._id.toString()});

      for(let i in oldApis) {
        let oapi = oldApis[i];

        // 如果已经存在api，则不新增
        let eapi = yield apiDao.find({prdId: prdId, url: oapi.url, method: oapi.method.toLocaleUpperCase()});
        if(eapi.length && eapi.length > 0) continue;

        let napi = yield* initApi(oapi, root, teamId, projectId, prdId);
        let resApi = yield apiDao.insert(napi);
        console.log(`===新增成功一条API：prdId：${prdId}`);
        count++;
        resApis.push(resApi);
      }
    }

    sutil.success(this, {
      code: 200,
      count: count,
      data: resApis
    });
});

export default router;
