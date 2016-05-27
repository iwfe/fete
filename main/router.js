/**
 * Created by zyy on 15/7/7.
 * zhangyuyu@superjia.com
 */
import Router from 'koa-router';
const router = new Router();

var wrap = require('co-monk');
var parse = require('co-body');
// import convert from 'koa-convert';

var wrap = require('co-monk')
var db = require('../common/db')
var userDao = wrap(db.get('user'));

import utils from '../common/utils';

// api管理
// router.get('/api', function*(next) {
//     this.body = yield utils.render('index', utils.extend({
//         title: 'api管理'
//     }, this.locals));
// }).get('/api/(.*)', function*(netx) {
//     this.body = yield utils.render('index', utils.extend({
//         title: 'api管理'
//     }, this.locals));
// });
// router.get('/', async (ctx, next) => {
//     let user = yield userDao.findOne({
//         username: 'jade'
//     })
//     // for(let item in user) 
//         console.log(user.toString());
//     await ctx.render('layout');
// });

// 首页
router.get('/', function *(next) {
    let user = yield userDao.findOne({
        username: 'jade'
    })
    console.log(user)
    console.log(this.render)
    yield this.render('layout', {
        user: 'John'
      });
    // var body = yield this.render('layout',{
    //     title: ''
    // });
    // console.log(body)
    // this.body = body
});

export default router;;