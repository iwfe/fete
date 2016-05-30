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

var userDao = wrap(db.get('user'));
var loginUserStore = new Map();


var utils = {
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

    //渲染页面
    // render: views('./common', {
    //     map: { html: 'jade' }
    // }),

    //页面渲染
    * render(ctx, data = {}) {
        let staticTag = 'index';
        let pathArr = ctx.path.split('/');
        if(pathArr[1]) {
            staticTag = pathArr[1];
        }
        yield ctx.render(data.tpl || 'layout', _.extend({
            commonTag: '',
            staticTag: staticTag
        }, ctx.locals, data));
    },

    reactRender(component, data = {}) {
        return ReactDom.renderToString(React.createElement(component, data));
    },

    //是否登录
    * login(next, teamRole) {
        var user = this.locals._user
        if (!user) {
            utils.failed(this, 10001)
            return true
        }
        yield next
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

    wrapUser: function(user) {
        user.isSuperAdmin = user.role == 'superadmin'
        user.isAdmin = user.role == 'admin'
        user.isMember = user.role == 'member'
        return user
    },

    isEmail: function(v) {
        return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(v);
    },

    isMobileNum: function(v) {
        return /^1[3|4|5|7|8]\d{9}$/.test(v);
    },

    isMobile: function(req) {
        var phoneReg = "\\b(ip(hone|od)|android|opera m(ob|in)i" + "|windows (phone|ce)|blackberry" + "|s(ymbian|eries60|amsung)|p(laybook|alm|rofile/midp" + "|laystation portable)|nokia|fennec|htc[-_]" + "|mobile|up.browser|[1-4][0-9]{2}x[1-4][0-9]{2})\\b"

        var tableReg = "\\b(ipad|tablet|(Nexus 7)|up.browser" + "|[1-4][0-9]{2}x[1-4][0-9]{2})\\b"

        var agent = req.header['user-agent'].toLowerCase()
        if (!agent)
            return false

        if (!!new RegExp(phoneReg, 'igm').exec(agent) || !!new RegExp(tableReg, 'igm').exec(agent)) {
            return true
        }
        return false
    },

    isWeixin: function(req) {
        var agent = req.header('USER-AGENT').toLowerCase()
        if (!agent)
            return false
        if (agent.match(/MicroMessenger/i) == 'micromessenger') {
            return true
        } else {
            return false
        }
    },

    //delta相差天数
    fromNow: function(delta) {
        var now = new Date()

        delta = delta || delta * 86400000

        return new Date(now.getFullYear(), now.getMonth(), now.getDay()) - delta;
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
export default utils;
