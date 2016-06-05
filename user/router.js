/**
 * Created by zyy on 15/7/7.
 * zhangyuyu@superjia.com
 */
import Router from 'koa-router';
const router = new Router();

var wrap = require('co-monk');
// var parse = require('co-body');
// import convert from 'koa-convert';

var wrap = require('co-monk')
var db = require('../common/db')
var userDao = wrap(db.get('user'));

import utils from '../common/utils';

import Index from './index';
import Login from './login';

// 首页
router.get('/', function*(next) {
    var html = utils.reactRender(Index, {
        number: 2
    });
    // let user = yield userDao.findOne({
    //     username: 'jade'
    // })
    yield utils.render(this, {
        html: html,
        number: 2
    });
});

router.all('/login', function*(next) {
    // let user = yield userDao.findOne({
    //     username: 'jade'
    // })
    const parse = this.parse;
    const username = parse.username;
    const html = utils.reactRender(Login, {
        username: username
    });
    if(this.locals._user.username) {
        this.redirect('/');
        return;
    }
    if (utils.isGet(this.method)) {
        yield utils.render(this, {
            html: html,
            noHeader: true
        });
    } else {
        const password = utils.wrapUserPass(parse.password);
        const user = yield userDao.findOne({
            username: username,
            password: password
        });

        if (!user) {
            yield utils.render(this, {
                html: html,
                noHeader: true,
                username: username,
                error: '用户名或密码不正确'
            });
        } else {
            const refer = this.get('Referrer') || '/';
            yield utils.setLoginUser(this, username, parse.password);
            this.redirect(refer);
        }
    }
});

router.get('/logout', function* (next) {
    this.cookies.set('feteauth', null);
    this.redirect('/login');
});

export default router;;
