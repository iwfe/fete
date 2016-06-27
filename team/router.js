/**
 * Created by zyy on 15/7/7.
 * zhangyuyu@superjia.com
 */
import Router from 'koa-router';
const router = new Router({
    prefix: '/team'
});
const wrap = require('co-monk');
const db = require('../common/db');
const userDao = wrap(db.get('user'));
const teamDao = wrap(db.get('team'));
import uuid from 'node-uuid';

import sutil from '../common/sutil';

// 团队
router.get('/', sutil.login, function*(next) {

    yield sutil.render(this, {});
});

router.get('/:id', sutil.login, function*(next) {

    yield sutil.render(this, {});
});

router.get('/data', sutil.login, function*(next) {
    const user = this.locals._user;
    console.log(`user: ${user}`)
    const teamIds = user.teams;
    let teams = [];
    if (teamIds && teamIds.length) {
        teams = yield teamDao.find({
            _id: teamIds
        });
    }
    console.log(teams);
    sutil.success(this, teams);
});

router.post('/data', sutil.login, function*(next) {
    const user = this.locals._user;
    const teamIds = user.teams;
    let teams = [];
    if (teamIds && teamIds.length) {
        teams = yield teamDao.find({
            _id: teamIds
        });
    }
    console.log(teams);
    sutil.success(this, teams);
});

export default router;