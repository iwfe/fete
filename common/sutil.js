/**
* @Author: lancui
* @Date:   2016-07-04 11:07:00
* @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-07-05 16:07:04
*/



/**
 * Created by zyy on 15/6/26.
 * zhangyuyu@superjia.com
 */
import message from './message';
// var nodemailer  = require("nodemailer");
// import views form 'co-views';
import wrap from 'co-monk';
import db from './db';
import config from '../config.js';
import crypto from 'crypto';
import _ from 'underscore';
import React from 'react';
import ReactDom from 'react-dom/server';
import {
  Header
} from '../layout/layout';

import util from './util';

// 监听message
import serverSocket from '../socket/server';

var userDao = wrap(db.get('user'));
var teamDao = wrap(db.get('team'));
var projectDao = wrap(db.get('project'));
var prdDao = wrap(db.get('prd'));
var msgDao = wrap(db.get('message'));
var loginUserStore = new Map();

var sutil = {
  //json成功返回
  success(ctx, value) {
    ctx.body = {
      code: 200,
      data: value
    }
    return false;
  },
  //json失败返回
  failed(ctx, code) {

    ctx.body = {
      code: code,
      message: message[code] || ''
    }
    return false;
  },

  //页面渲染
  * render(ctx, data = {}) {
    let staticTag = 'index';
    let pathArr = ctx.path.split('/');
    if (pathArr[1]) {
      staticTag = pathArr[1];
    }
    data.commonTag && (data.commonTag += '_');
    //为每个页面添加数据
    let staticTagMap = _.extend({}, data);
    delete staticTagMap.html;
    delete staticTagMap.header;
    const user = Object.assign({}, ctx.locals._user);
    delete user._id;
    delete user.teams;
    ctx.locals._user = user;
    yield ctx.render(data.tpl || 'layout', _.extend({
      commonTag: 'react_',
      staticTag: staticTag,
      staticTagMap: staticTagMap,
      header: data.noHeader ? '' : this.reactRender(Header, {
        user: user,
        menus: data.menus || [],
        current: staticTag
      })
    }, ctx.locals, data));
  },

  reactRender(component, data = {}) {
    return ReactDom.renderToString(React.createElement(component, data));
  },

  * result(ctx, data) {
    switch (ctx.accepts('json', 'html', 'text')) {
      case 'json':
        if (data.value) {
          return this.success(ctx, data.value);
        }
        if (data.code) {
          return this.failed(ctx, data.code);
        }
        break;
      default:
        if (data.redirect) {
          ctx.redirect(data.redirect);
        } else {
          yield this.render(ctx, data);
        }
    }
  },

  isGet(method) {
    return method.toLowerCase() === 'get';
  },

  isPost(method) {
    return method.toLowerCase() === 'post';
  },

  //是否登录
  * login(next) {
    var user = this.locals._user
    if (!user.username) {
      return yield sutil.result(this, {
        code: 10001,
        redirect: '/login?next=' + this.url
      });
    }
    yield next;
  },

  //team login
  teamLogin(role) {
    return function *(next) {
      let user = this.locals._user;
      const {teamId} = this.parse;
      const redirect = '/team';
      if (!user.username) {
        return yield sutil.result(this, {
          code: 10001,
          redirect: '/login?next=' + this.url
        });
      }

      let team = _.find(user.teams, function (item) {
        return item === teamId;
      });
      if (!team) {
        return yield sutil.result(this, {
          code: 11001,
          redirect: redirect
        });
      }
      team = yield teamDao.findOne({
        id: team
      });
      if (!team) {
        return yield sutil.result(this, {
          code: 11001,
          redirect: redirect
        });
      }
      if (role) {
        switch (role) {
          case 'owner':
            if(team.createUser !== user.username){
              return yield sutil.result(this, {
                code: 11002,
                redirect: redirect
              });
            }
            break;
        }
      }
      user.team = team;
      yield next;
    }

  },

  //project login
  * projectLogin(next) {
    let user = this.locals._user;
    const {projectId} = this.parse;
    const redirect = '/team';
    if (!user.username) {
      return yield sutil.result(this, {
        code: 10001,
        redirect: '/login?next=' + this.url
      });
    }

    const project = yield projectDao.findOne({
      id: projectId
    });

    if (!project) {
      return yield sutil.result(this, {
        code: 12002,
        redirect: redirect
      });
    }
    const teamId = project.teamId;

    let team = _.find(user.teams, function (item) {
      return item === teamId;
    });

    if (!team) {
      return yield sutil.result(this, {
        code: 11001,
        redirect: redirect
      });
    }

    team = yield teamDao.findOne({
      id: team
    });

    if (!team) {
      return yield sutil.result(this, {
        code: 11001,
        redirect: redirect
      });
    }
    user.project = project;
    user.team = team;
    yield next;
  },

  //prd login
  * prdLogin(next) {
    let user = this.locals._user;
    const {prdId} = this.parse;
    const redirect = '/team';
    if (!user.username) {
      return yield sutil.result(this, {
        code: 10001,
        redirect: '/login?next=' + this.url
      });
    }
    const prd = yield prdDao.findOne({
      id: prdId
    })

    if (!prd) {
      return yield sutil.result(this, {
        code: 13002,
        redirect: redirect
      });
    }

    const projectId = prd.projectId;

    const project = yield projectDao.findOne({
      id: projectId
    });

    if (!project) {
      return yield sutil.result(this, {
        code: 12002,
        redirect: redirect
      });
    }
    const teamId = project.teamId;

    let team = _.find(user.teams, function (item) {
      return item === teamId;
    });

    if (!team) {
      return yield sutil.result(this, {
        code: 11001,
        redirect: redirect
      });
    }

    team = yield teamDao.findOne({
      id: team
    });

    if (!team) {
      return yield sutil.result(this, {
        code: 11001,
        redirect: redirect
      });
    }
    user.prd = prd;
    user.project = project;
    user.team = team;
    yield next;
  },

  //登录用户cookie管理
  * getLoginUser(ctx) {
    let feteauth = ctx.cookies.get('feteauth');
    if (!feteauth) return null;
    let decrypted = '';
    let decipher = crypto.createDecipher('rc4', config.authKey);
    decrypted += decipher.update(feteauth, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    let auth = decrypted.split('|');

    let username = auth[0];
    let password = auth[1];
    let ip = ctx.ip;
    if (!auth[2] || auth[2] != ip) return null;

    let user = loginUserStore.get(username);
    if (!user) {
      user = yield userDao.findOne({
        username: username,
        password: password
      });
      return user;
    } else {
      return (user.username === username && user.password === password) ? user : null;
    }
  },

  //设置登录用户
  * setLoginUser(ctx, username, password) {
    var password = this.wrapUserPass(password);
    var user = yield userDao.findOne({
      username: username,
      password: password
    });

    if (!user) {
      return false;
    }


    var ip = ctx.ip;
    var str = username + '|' + password + '|' + ip;
    var encrypted = '';
    var cip = crypto.createCipher('rc4', config.authKey);
    encrypted += cip.update(str, 'utf8', 'hex');
    encrypted += cip.final('hex');
    ctx.cookies.set('feteauth', encrypted);

    loginUserStore.set(username, user);
  },

  wrapUserPass(password) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(password + config.passwordKey);
    md5sum = md5sum.digest('hex');
    return md5sum;
  },

  /**
   * 封装用户
   * @param user,可以是数组或者单个user对象
   * @param banKeys,过滤不要的字段,默认不需要_id和password
   * @returns {*}
   */
  wrapUser: function (user, banKeys = []) {
    banKeys = banKeys.concat(['_id', 'password']);

    //封装单个用户
    function wrap(item) {
      return _.pick(item, function (value, key, object) {
        return banKeys.indexOf(key) === -1;
      });
    }

    if (_.isArray(user)) {
      return user.map(item => {
        return wrap(item);
      })
    } else {
      return wrap(user);
    }
  },

  * setRouterParams (next) {
    this.parse = _.extend(this.parse, this.params);
    yield next;
  },

  * genId(dao, len = 6) {
    let id = util.genId(len);
    console.log(`s:${id}`);
    while (yield dao.findOne({
      id: id
    })) {
      id = util.genId(len);
      console.log(`s1:${id}`);
    }
    return id;
  },
  * allowCORS (next) {
    this.set('Access-Control-Allow-Origin', '*')
    this.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    this.set('Access-Control-Allow-Headers', 'X-Requested-With')
    yield next
  },
  // 初始化 socket.io
  initSocketServer (app) {
    serverSocket.init(app)
  },
  /**
   * 添加消息并发送提醒
   * @param msgData 消息对象，toUsers为空
   * @param toUsers 可选
   */
  * addMessage (msgData, teamId, toUsers) {
    //获取team里的所有user
    if(!!teamId) {
      let users = yield userDao.find({teams: teamId});
      toUsers = [];
      for(let i in users) {
        toUsers.push(users[i].username);
      }
    }
    console.log(`===toUsers==${toUsers}`);
    // 保存消息对象
    let addToUsers = [];
    for(let i in toUsers) {
      addToUsers.push({userId:toUsers[i], status: 0});
    }
    let res = yield msgDao.insert(
      _.extend(msgData, {
        id: yield sutil.genId(msgDao, 10),
        toUsers: addToUsers
    }));

    // 发送消息
    if(toUsers.length > 0) {
      serverSocket.sendMsg(toUsers);
    }
    return res;
  },
  // 更新客户端的提醒个数
  updateClientMsg (toUsers) {
    serverSocket.sendMsg(toUsers, false);
  }

  // sendMail: function(name, title){
  //     var transporter = nodemailer.createTransport();
  //     var users = [
  //         'enzoyang@superjia.com', // 杨恩朋
  //         'zhanshanqin@superjia.com', // 占善钦
  //         'baiwenhao.sh@superjia.com', // 白文浩
  //         'mengyue.sh@superjia.com', // 孟月
  //         'zhangyuyu@superjia.com', // 张玉玉
  //         'zhuxinyong.sh@superjia.com', // 朱信勇
  //         'liyaping@superjia.com', // 李亚平
  //         'yuqingyang.sh@superjia.com', // 于清洋
  //         'lancui@superjia.com' // 兰翠
  //     ]

  //     transporter.sendMail({
  //         from: 'mumtt621722@163.com',
  //         to: users.join(','),
  //         subject: '爱屋前端小屋有文章更新啦',
  //         html: name + ' 添加了一篇文章 <a href="http://fe.superjia.com"> '+title+' </a>'
  //     });
  // }
}
export default sutil;
