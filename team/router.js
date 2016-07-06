/**
 * Created by zyy on 15/7/7.
 * zhangyuyu@superjia.com
 */
import Router from 'koa-router';
import _ from 'underscore';
const router = new Router({
    prefix: '/team'
});
const wrap = require('co-monk');
const db = require('../common/db');
const userDao = wrap(db.get('user'));
const teamDao = wrap(db.get('team'));

import sutil from '../common/sutil';

router.get('/data', sutil.login, function*(next) {
    const user = this.locals._user;
    const teamIds = user.teams;
    let teams = [];
    if (teamIds && teamIds.length) {
        teams = yield teamDao.find({
            id: {
                $in: teamIds
            }
        }, {
          sort: {createTime: -1}
        });
    }
    sutil.success(this, teams);
});

router.post('/data', sutil.login, function*(next) {
    const parse = this.parse;
    const user = this.locals._user;
    const teamIds = user.teams || [];
    const id = yield sutil.genId(teamDao);

    const team = yield teamDao.insert({
        id: id,
        name: parse.name,
        createUser: user.username,
        description: parse.description,
        createTime: Date.now(),
        updateTime: Date.now()
    });
    teamIds.push(team.id);
    yield userDao.update({
        _id: user._id
    }, {
        $set: {
            teams: teamIds
        }
    })
    sutil.success(this, team);
});

router.put('/data', sutil.login, function*(next) {
    const parse = this.parse;
    const id = parse.id;
    const user = this.locals._user;

    let team = yield teamDao.findOne({
        id: id
    });

    if (!team) {
        sutil.failed(this, 11003);
        return false;
    }

    if (team.createUser !== user.username) {
        sutil.failed(this, 11002);
        return false;
    }


    yield teamDao.update({
        id: parse.id
    }, {
        $set: Object.assign({
                updateTime: Date.now()
            },
            parse)
    });
    sutil.success(this, Object.assign({}, team, parse));
});

router.del('/data', sutil.login, function*(next) {
    const parse = this.parse;
    const id = parse.id;
    const user = this.locals._user;
    let teamIds = user.teams || [];

    const team = yield teamDao.findOne({
        id: id
    });

    if (!team) {
        sutil.failed(this, 11003);
        return false;
    }

    if (team.createUser !== user.username) {
        sutil.failed(this, 11002);
        return false;
    }

    yield teamDao.remove({
        id: id
    });

    teamIds = _.without(teamIds, id);


    yield userDao.update({
        _id: user._id
    }, {
        $set: {
            teams: teamIds
        }
    });
    sutil.success(this, team);
});


/********member**********/
router.get('/member', sutil.teamLogin(), function*(next) {
  const user = this.locals._user;
  const {teamId} = this.parse;
  const teamIds = user.teams;
  if(teamIds.indexOf(teamId) === -1) {
    sutil.failed(this, 11001);
    return;
  }

  let users = sutil.wrapUser(yield userDao.find({
    teams: teamId
  },{
    sort: {createTime: -1}
  }), ['teams']);
  sutil.success(this, users);
});

router.post('/member/invite', sutil.teamLogin(), function*(next) {
  const user = this.locals._user;
  const {teamId, username} = this.parse;
  const member = sutil.wrapUser(yield userDao.findOne({
    username: username
  }));
  if(member) {
    let teams = member.teams;
    if(teams.indexOf(teamId) === -1) {
      teams.push(teamId);
    }
    yield userDao.update({
      username: username
    }, {
      $set: {
        teams: teams
      }
    });
  }
  sutil.success(this, member);
});

router.del('/member', sutil.teamLogin('owner'), function*(next) {
  const parse = this.parse;
  const {teamId, username} = parse;
  const member = sutil.wrapUser(yield userDao.findOne({
    username: username
  }));

  if(member) {
    let teamIds = member.teams;
    teamIds = _.without(teamIds, teamId);
    yield userDao.update({
      username: username
    }, {
      $set: {
        teams: teamIds
      }
    });
    member.teams = teamIds;
  }
  sutil.success(this, member);
});


// 团队
router.get('/', sutil.login, function*(next) {
  yield sutil.render(this, {});
});

//团队详情
router.get('/:teamId',  sutil.setRouterParams, sutil.teamLogin(), function*(next) {
  yield sutil.render(this, {
    team: yield teamDao.findOne({
      id: this.parse.teamId
    })
  });
});


export default router;
