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
  prefix: '/iconfont'
});
const wrap = require('co-monk');
const db = require('../../common/db');
const userDao = wrap(db.get('user'));
const iconfontDao = wrap(db.get('iconfont'));
const projectDao = wrap(db.get('project'));
const prdDao = wrap(db.get('prd'));

import sutil from '../../common/sutil';

router.get('/data', sutil.login, function*(next) {
  const user = this.locals._user;
  let iconfonts = user.iconfonts;
  const iconfontIds = _.pluck(iconfonts, 'id');
  if (iconfonts && iconfonts.length) {
    iconfonts = yield iconfontDao.find({
      id: {
        $in: iconfontIds
      }
    }, {
      sort: {createTime: -1}
    });
  }
  sutil.success(this, iconfonts);
});

router.post('/data', sutil.login, function*(next) {
  const parse = this.parse;
  const user = this.locals._user;
  let iconfonts = user.iconfonts || [];
  const id = yield sutil.genId(iconfontDao);

  const iconfont = yield iconfontDao.insert({
    id: id,
    name: parse.name,
    createUser: user.username,
    description: parse.description,
    createTime: Date.now(),
    updateTime: Date.now()
  });
  iconfonts.push({
    id: iconfont.id,
    role: 'owner',
    status: 'normal',
  });
  yield userDao.update({
    _id: user._id
  }, {
    $set: {
      iconfonts: iconfonts
    }
  })
  sutil.success(this, iconfont);
});

router.put('/data', sutil.login, function*(next) {
  const parse = this.parse;
  const id = parse.id;
  const user = this.locals._user;

  let iconfont = yield iconfontDao.findOne({
    id: id
  });

  if (!iconfont) {
    sutil.failed(this, 11003);
    return false;
  }

  if (iconfont.createUser !== user.username) {
    sutil.failed(this, 11002);
    return false;
  }


  yield iconfontDao.update({
    id: parse.id
  }, {
    $set: Object.assign({
        updateTime: Date.now()
      },
      parse)
  });
  sutil.success(this, Object.assign({}, iconfont, parse));
});

router.del('/data', sutil.login, function*(next) {
  const parse = this.parse;
  const id = parse.id;
  const user = this.locals._user;
  let iconfonts = user.iconfonts || [];

  const iconfont = yield iconfontDao.findOne({
    id: id
  });

  if (!iconfont) {
    sutil.failed(this, 11003);
    return false;
  }

  if (iconfont.createUser !== user.username) {
    sutil.failed(this, 11002);
    return false;
  }

  yield iconfontDao.remove({
    id: id
  });

  iconfonts = _.filter(iconfonts, item => item.id === id);


  yield userDao.update({
    _id: user._id
  }, {
    $set: {
      iconfonts: iconfonts
    }
  });
  sutil.success(this, iconfont);
});


/********member**********/
router.get('/member', sutil.iconfontLogin(), function*(next) {
  const user = this.locals._user;
  const {iconfontId} = this.parse;
  const iconfonts = user.iconfonts;

  let users = sutil.wrapUser(yield userDao.find({
    'iconfonts.id': iconfontId
  }, {
    sort: {createTime: -1}
  }), ['iconfonts'], iconfontId);
  sutil.success(this, users);
});

router.post('/member/invited', sutil.iconfontLogin(), function*(next) {
  const user = this.locals._user;
  const {iconfontId, username} = this.parse;
  const member = sutil.wrapUser(yield userDao.findOne({
    username: username
  }));
  if (member) {
    let iconfonts = member.iconfonts;
    let iconfont = {
      id: iconfontId,
      role: 'member',
      status: 'invite'
    };

    //没有加入该团队
    if (!_.find(iconfonts, item => item.id === iconfontId)) {
      iconfonts.push(iconfont);

    }
    yield userDao.update({
      username: username
    }, {
      $set: {
        iconfonts: iconfonts
      }
    });
    member.iconfont = iconfont;
    const iconfontDetail = yield iconfontDao.findOne({
      id: iconfontId
    })
    //发送邀请消息
    const invitedMsg = {
      userName: user.username,   // 操作人姓名
      msgType: '0',   // 消息类型：系统(0)，提醒(1)
      platform: 'iconfont',    // 平台类型(iconfont, project, prd, api)
      platformId: iconfontId,   // 平台Id
      action: 'invited', // 操作 (如：add, update, delete,invited)
      actionDetail: {
        message: `${user.username}邀请你加入"${iconfontDetail.name}"`,
        btns: [{
          text: '接受',
          style: 'primary',
          type: 'ajax',
          resultText: '已接受',
          ajax: {
            url: '/iconfont/member/invited/accept',
            method: 'post',
            body: {
              iconfontId: iconfontId,
            }
          }
        }, {
          text: '拒绝',
          type: 'ajax',
          style: 'danger',
          resultText: '已拒绝',
          ajax: {
            url: '/iconfont/member/invited/reject',
            method: 'post',
            body: {
              iconfontId: iconfontId,
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
  const {iconfontId} = this.parse;

  let iconfonts = user.iconfonts;

  let userIconfont = _.find(iconfonts, function (item) {
    return item.id === iconfontId;
  });

  if (!userIconfont) {
    return yield sutil.result(this, {
      code: 11001
    });
  }

  userIconfont.status = 'normal';

  yield userDao.update({
    username: user.username
  }, {
    $set: {
      iconfonts: iconfonts
    }
  });

  sutil.success(this, {});
});

router.post('/member/invited/reject', sutil.login, function*(next) {
  const user = this.locals._user;
  const {iconfontId} = this.parse;

  let iconfonts = user.iconfonts;

  let userIconfont = _.find(iconfonts, item => item.id === iconfontId);

  if (!userIconfont) {
    return yield sutil.result(this, {
      code: 1004
    });
  }

  iconfonts = _.filter(iconfonts, item => item.id !== iconfontId);

  yield userDao.update({
    username: user.username
  }, {
    $set: {
      iconfonts: iconfonts
    }
  });

  sutil.success(this, {});
});

router.del('/member', sutil.iconfontLogin('owner'), function*(next) {
  const user = this.locals._user;
  const parse = this.parse;
  const {iconfontId, username} = parse;
  if (username === user.username) {
    sutil.failed(this, 1002);
    return false
  }
  const member = sutil.wrapUser(yield userDao.findOne({
    username: username
  }));

  if (member) {
    let iconfonts = member.iconfonts;
    iconfonts = _.filter(iconfonts, item => item.id !== iconfontId);
    yield userDao.update({
      username: username
    }, {
      $set: {
        iconfonts: iconfonts
      }
    });
    member.iconfonts = iconfonts;
  }
  sutil.success(this, member);
});

/********prd**********/
router.get('/prd', sutil.iconfontLogin(), function*(next) {
  const user = this.locals._user;
  const {iconfontId, filter} = this.parse;
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
    iconfontId: iconfontId,
  }
  if(query && query.length) {
    findQuery['$or'] = query;
  }
  const prds = yield prdDao.find(findQuery);
  const projects = yield projectDao.find({
    iconfontId: iconfontId
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
router.get('/:iconfontId', sutil.setRouterParams, sutil.iconfontLogin(), function*(next) {
  yield sutil.render(this, {
    iconfont: yield iconfontDao.findOne({
      id: this.parse.iconfontId
    })
  });
});


export default router;
