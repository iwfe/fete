import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import views from 'koa-views';
import mount from 'koa-mount';
import serve from 'koa-static';
// import finalHandler from './lib/finalHandler';
// import router from './router';

const app = new Koa();

// var redisStore = require('koa-redis');

var config = require('./config');
var utils = require('./common/utils');

// middleware
app.use(views(`${__dirname}/view`, {
    extension: 'jade'
}));
app.use(logger());

app.use(mount('/static', serve('dist')));
// app.use(bodyParser());

app.proxy = true;

app.keys = ['fete'];
// app.use(session({
//     key: 'iwfe',
//     prefix: 'user-',
//     rolling: true,
//     cookie: {
//         path: '/',
//         httpOnly: true,
//         maxage: 1000 * 60 * 60 * 24 * 7,
//         rewrite: true,
//         signed: false
//     }
//     // store: redisStore(config.redis)
// }));
// 
// 

app.use(function *(next) {
    this.locals = {}

    this.set({
            'Pragma': 'No-cache',
            'Cache-Control': 'no-cache'
        })
        // co(utils.setLoginUser(this, 'jade', '111111'));

    //utils.getLoginUser(this);

    // console.log(new Buffer('我是koajs').toString('base64'));
    // this.cookies.set('test', new Buffer('我是koajs').toString('base64'))
    //var user = this.session.user || null

    // if (user) {
    //     this.locals._user = utils.wrapUser(utils.extend({}, user));
    // }


    this.locals._now = new Date().getTime()
    try {
        yield next;
        // Handle 404 upstream.
        var status = this.status || 404;
        if (status === 404) this.throw(404);
    } catch (error) {
        this.status = error.status || 500;
        if (this.status === 404) {
            yield this.render('error', { error });
        } else {
            yield this.render('error', { error });
        }
        this.app.emit('error', error, this);
    }
});

import main from './main/router';
app.use(main.routes());

app.on('error', function(err) {
    console.log('sent error %s to the cloud', err.message);
    console.log(err);
});

module.exports = app;

// var main = require('./main/router');
// // var blog = require('./router/blog');
// // var collects = require('./router/collects');
// // var user = require('./router/user');
// // var tag = require('./router/tag');
// // var api = require('./router/api');

// // app.use(blog.routes());
// // app.use(collects.routes());
// // app.use(user.routes());
// // app.use(tag.routes());
// // app.use(api.routes());

// if(config.env == 'dev'){
//     app.use(async serve(__dirname));
// }
// app.use(async main.routes());

// // app.use(function *(next) {

// // });

// app.on('error', function(err){
//     console.log('sent error %s to the cloud', err.message);
//     console.log(err);
// });