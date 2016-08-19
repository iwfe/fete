/**
* @Author: lancui
* @Date:   2016-07-15 19:07:00
* @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-07-20 11:07:50
*/



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
const db = require('../../common/db');
const userDao = wrap(db.get('user'));
const teamDao = wrap(db.get('team'));
const projectDao = wrap(db.get('project'));
const prdDao = wrap(db.get('prd'));

import sutil from '../../common/sutil';

router.get('/data', sutil.login, function*(next) {
  const user = this.locals._user;
  let teams = user.teams;
  const teamIds = _.pluck(teams, 'id');
  if (teams && teams.length) {
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
  let teams = user.teams || [];
  const id = yield sutil.genId(teamDao);

  const team = yield teamDao.insert({
    id: id,
    name: parse.name,
    createUser: user.username,
    description: parse.description,
    createTime: Date.now(),
    updateTime: Date.now()
  });
  teams.push({
    id: team.id,
    role: 'owner',
    status: 'normal',
  });
  yield userDao.update({
    _id: user._id
  }, {
    $set: {
      teams: teams
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
  let teams = user.teams || [];

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

  teams = _.filter(teams, item => item.id === id);


  yield userDao.update({
    _id: user._id
  }, {
    $set: {
      teams: teams
    }
  });
  sutil.success(this, team);
});


/********member**********/
router.get('/member', sutil.teamLogin(), function*(next) {
  const user = this.locals._user;
  const {teamId} = this.parse;
  const teams = user.teams;

  let users = sutil.wrapUser(yield userDao.find({
    'teams.id': teamId
  }, {
    sort: {createTime: -1}
  }), ['teams'], teamId);
  sutil.success(this, users);
});

router.post('/member/invited', sutil.teamLogin(), function*(next) {
  const user = this.locals._user;
  const {teamId, username} = this.parse;
  const member = sutil.wrapUser(yield userDao.findOne({
    username: username
  }));
  if (member) {
    let teams = member.teams;
    let team = {
      id: teamId,
      role: 'member',
      status: 'invite'
    };

    //没有加入该团队
    if (!_.find(teams, item => item.id === teamId)) {
      teams.push(team);

    }
    yield userDao.update({
      username: username
    }, {
      $set: {
        teams: teams
      }
    });
    member.team = team;
    const teamDetail = yield teamDao.findOne({
      id: teamId
    })
    //发送邀请消息
    const invitedMsg = {
      userName: user.username,   // 操作人姓名
      msgType: '0',   // 消息类型：系统(0)，提醒(1)
      platform: 'team',    // 平台类型(team, project, prd, api)
      platformId: teamId,   // 平台Id
      action: 'invited', // 操作 (如：add, update, delete,invited)
      actionDetail: {
        message: `${user.username}邀请你加入"${teamDetail.name}"`,
        btns: [{
          text: '接受',
          style: 'primary',
          type: 'ajax',
          resultText: '已接受',
          ajax: {
            url: '/team/member/invited/accept',
            method: 'post',
            body: {
              teamId: teamId,
            }
          }
        }, {
          text: '拒绝',
          type: 'ajax',
          style: 'danger',
          resultText: '已拒绝',
          ajax: {
            url: '/team/member/invited/reject',
            method: 'post',
            body: {
              teamId: teamId,
            }
          }
        }]
      }
    }
    yield sutil.addMessage(invitedMsg, null, [username]);
  }

  sutil.success(this, member);
});

router.post('/member/invited/accept', sutil.login, function*(next) {
  let user = this.locals._user;
  const {teamId} = this.parse;

  let teams = user.teams;

  let userTeam = _.find(teams, function (item) {
    return item.id === teamId;
  });

  if (!userTeam) {
    return yield sutil.result(this, {
      code: 11001
    });
  }

  userTeam.status = 'normal';

  yield userDao.update({
    username: user.username
  }, {
    $set: {
      teams: teams
    }
  });

  sutil.success(this, {});
});

router.post('/member/invited/reject', sutil.login, function*(next) {
  const user = this.locals._user;
  const {teamId} = this.parse;

  let teams = user.teams;

  let userTeam = _.find(teams, item => item.id === teamId);

  if (!userTeam) {
    return yield sutil.result(this, {
      code: 1004
    });
  }

  teams = _.filter(teams, item => item.id !== teamId);

  yield userDao.update({
    username: user.username
  }, {
    $set: {
      teams: teams
    }
  });

  sutil.success(this, {});
});

router.del('/member', sutil.teamLogin('owner'), function*(next) {
  const user = this.locals._user;
  const parse = this.parse;
  const {teamId, username} = parse;
  if (username === user.username) {
    sutil.failed(this, 1002);
    return false
  }
  const member = sutil.wrapUser(yield userDao.findOne({
    username: username
  }));

  if (member) {
    let teams = member.teams;
    teams = _.filter(teams, item => item.id !== teamId);
    yield userDao.update({
      username: username
    }, {
      $set: {
        teams: teams
      }
    });
    member.teams = teams;
  }
  sutil.success(this, member);
});

/********prd**********/
router.get('/prd', sutil.teamLogin(), function*(next) {
  const user = this.locals._user;
  const {teamId, filter} = this.parse;
  const filterArr = filter ? filter.split(',') : [];
  let query = [];
  const now = Date.now();
  if (filter === 'all') {
    query = null;
  } else {
    filterArr.map(item => {
      switch (item) {
        case 'mrd':
          query.push({
            mrdTime: {
              $lte: now,
            },
            prdTime: {
              $gt: now,
            }
          });
          break;
        case 'prd':
          query.push({
            prdTime: {
              $lte: now,
            },
            devTime: {
              $gt: now,
            }
          });
          break;
        case 'dev':
          query.push({
            devTime: {
              $lte: now,
            },
            apiTime: {
              $gt: now,
            }
          });
          break;
        case 'api':
          query.push({
            apiTime: {
              $lte: now,
            },
            testTime: {
              $gt: now,
            }
          });
          break;
        case 'test':
          query.push({
            testTime: {
              $lte: now,
            },
            betaTime: {
              $gt: now,
            }
          });
          break;
        case 'beta':
          query.push({
            betaTime: {
              $lte: now,
            },
            onlineTime: {
              $gt: now,
            }
          });
          break;
        case 'online':
          query.push({
            onlineTime: {
              $lte: now,
            }
          });
          break;
      }
    });
  }
  let findQuery = {
    teamId: teamId,
  }
  if(query && query.length) {
    findQuery['$or'] = query;
  }
  const prds = yield prdDao.find(findQuery);
  const projects = yield projectDao.find({
    teamId: teamId
  });
  let projectMap = {}
  _.map(projects, item => projectMap[item.id] = item);
  _.map(prds, item => item.project = projectMap[item.projectId]);
  console.log(prds)
  sutil.success(this, prds);
});


// 团队
router.get('/', sutil.login, function*(next) {
  yield sutil.render(this, {});
});

//团队详情
router.get('/:teamId', sutil.setRouterParams, sutil.teamLogin(), function*(next) {
  yield sutil.render(this, {
    team: yield teamDao.findOne({
      id: this.parse.teamId
    })
  });
});


export default router;
