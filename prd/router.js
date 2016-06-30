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

// 项目
router.get('/', sutil.projectLogin, function*(next) {
    yield sutil.render(this, {});
});

router.get('/data', sutil.projectLogin, function*(next) {
    const user = this.locals._user;
    const prdId = user.prd;

    sutil.success(this, yield prdDao.find({
      prdId: prdId
    }));
});

router.post('/data', sutil.projectLogin, function*(next) {
    const parse = this.parse;
    const user = this.locals._user;
    const id = yield sutil.genId(prdDao);

    const prd = yield prdDao.insert({
        id: id,
        name: parse.name,
        createUser: user.username,
        prdId: parse.prdId,
        description: parse.description,
        createTime: Date.now(),
        updateTime: Date.now()
    });
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
        sutil.failed(this, 12002);
        return false;
    }

    if (prd.createUser !== user.username) {
        sutil.failed(this, 12001);
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
