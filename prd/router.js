/**
 * Created by zyy on 15/7/7.
 * zhangyuyu@superjia.com
 */
import Router from 'koa-router';
const router = new Router({
  prefix: '/prd'
});
const wrap = require('co-monk');
const db = require('../common/db');
const userDao = wrap(db.get('user'));
const prdDao = wrap(db.get('prd'));

import sutil from '../common/sutil';

// PRD
router.get('/', sutil.projectLogin, function*(next) {
  yield sutil.render(this, {});
});

router.get('/data', sutil.projectLogin, function*(next) {
  sutil.success(this, yield prdDao.find({
    projectId: this.parse.projectId
  }, {
    sort: {createTime: -1}
  }));
});

router.post('/data', sutil.projectLogin, function*(next) {
  const parse = this.parse;
  const user = this.locals._user;
  const {project} = user;
  const id = yield sutil.genId(prdDao);

  const oldPrd = yield prdDao.findOne({
    projectId: project.id
  },{
    sort: {createTime: -1}
  });

  console.log(oldPrd)

  const prd = yield prdDao.insert(Object.assign({}, {
    id: id,
    teamId: project.teamId,
    projectId: project.id,
    createUser: user.username,
    createTime: Date.now(),
    updateTime: Date.now()
  }, parse));
  if(oldPrd) yield sutil.copyApisByPrd(oldPrd.id, prd.id);
  sutil.success(this, prd);
});

router.put('/data', sutil.projectLogin, function*(next) {
  const parse = this.parse;
  const id = parse.id;
  const user = this.locals._user;

  let prd = yield prdDao.findOne({
    id: id
  });

  if (!prd) {
    sutil.failed(this, 13002);
    return false;
  }

  if (prd.createUser !== user.username) {
    sutil.failed(this, 13001);
    return false;
  }


  yield prdDao.update({
    id: parse.id
  }, {
    $set: Object.assign({
        updateTime: Date.now()
      },
      parse)
  });
  sutil.success(this, Object.assign({}, prd, parse));
});

router.del('/data', sutil.projectLogin, function*(next) {
  const parse = this.parse;
  const id = parse.id;
  const user = this.locals._user;

  const prd = yield prdDao.findOne({
    id: id
  });

  if (!prd) {
    sutil.failed(this, 12002);
    return false;
  }

  if (prd.createUser !== user.username) {
    sutil.failed(this, 12001);
    return false;
  }

  yield prdDao.remove({
    id: id
  });

  sutil.success(this, prd);
});

export default router;
