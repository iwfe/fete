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

var userDao = wrap(db.get('user'));
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
    const user = Object.assign({},ctx.locals._user);
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
  * teamLogin(next) {
    let user = this.locals._user;
    const {teamId} = this.parse;
    const redirect = '/team';
    if (!user.username) {
      return yield sutil.result(this, {
        code: 10001,
        redirect: '/login?next=' + this.url
      });
    }

    const team = _.find(user.teams, function (item) {
      return item === teamId;
    });

    if (!team) {
      return yield sutil.result(this, {
        code: 11001,
        redirect: '/team'
      });
    }
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

  wrapUser: function (user) {
    user.isSuperAdmin = user.role == 'superadmin'
    user.isAdmin = user.role == 'admin'
    user.isMember = user.role == 'member'
    return user
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
