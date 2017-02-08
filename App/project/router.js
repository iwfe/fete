/**
 * Created by zyy on 15/7/7.
 * zhangyuyu@superjia.com
 */
import Router from 'koa-router';
import _ from 'underscore';
const router = new Router({
    prefix: '/project'
});
const wrap = require('co-monk');
const db = require('../../common/db');
const userDao = wrap(db.get('user'));
const projectDao = wrap(db.get('project'));

import sutil from '../../common/sutil';

// 项目
router.get('/', sutil.teamLogin(), function*(next) {
    yield sutil.render(this, {});
});

//项目详情
router.get('/:projectId', sutil.setRouterParams, sutil.projectLogin, function*(next) {
  yield sutil.render(this, {
    project: yield projectDao.findOne({
      id: this.parse.projectId
    })
  });
});

// 所有数据，不受权限限制
router.get('/alldata', sutil.login, function*(next) {
    sutil.success(this, yield projectDao.find({
      teamId: this.parse.teamId
    }, {
      sort: {createTime: -1}
    }));
});

router.get('/data', sutil.teamLogin(), function*(next) {
    sutil.success(this, yield projectDao.find({
      teamId: this.parse.teamId
    }, {
      sort: {createTime: -1}
    }));
});

router.post('/data', sutil.teamLogin(), function*(next) {
    const parse = this.parse;
    const user = this.locals._user;
    const id = yield sutil.genId(projectDao);

    const project = yield projectDao.insert({
        id: id,
        name: parse.name,
        createUser: user.username,
        teamId: parse.teamId,
        description: parse.description,
        createTime: Date.now(),
        updateTime: Date.now()
    });
    sutil.success(this, project);
});

router.put('/data', sutil.teamLogin(), function*(next) {
    const parse = this.parse;
    const id = parse.id;
    const user = this.locals._user;

    let project = yield projectDao.findOne({
        id: id
    });

    if (!project) {
        sutil.failed(this, 12002);
        return false;
    }

    if (project.createUser !== user.username) {
        sutil.failed(this, 12001);
        return false;
    }


    yield projectDao.update({
        id: parse.id
    }, {
        $set: Object.assign({
                updateTime: Date.now()
            },
            parse)
    });
    sutil.success(this, Object.assign({}, project, parse));
});

router.del('/data', sutil.teamLogin(), function*(next) {
    const parse = this.parse;
    const id = parse.id;
    const user = this.locals._user;

    const project = yield projectDao.findOne({
        id: id
    });

    if (!project) {
        sutil.failed(this, 12002);
        return false;
    }

    if (project.createUser !== user.username) {
        sutil.failed(this, 12001);
        return false;
    }

    yield projectDao.remove({
        id: id
    });

    sutil.success(this, project);
});

export default router;
