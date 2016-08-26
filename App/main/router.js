/**
 * @Author: lancui
 * @Date:   2016-06-22 14:06:00
 * @Email:  lancui@superjia.com
 * @Last modified by:   lancui
 * @Last modified time: 2016-06-29 11:06:89
 */



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
var db = require('../../common/db')
var userDao = wrap(db.get('user'));

import sutil from '../../common/sutil';
import util from '../../common/util';
import busBoy from 'co-busboy';
import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';
import fse from 'fs-extra';

import Index from './index';
import Login from './login';
import Register from './register';

// 首页
router.get('/', function*(next) {
  var html = sutil.reactRender(Index, {
    number: 2
  });
  // let user = yield userDao.findOne({
  //     username: 'jade'
  // })
  yield sutil.render(this, {
    html: html,
    number: 2
  });
});

router.all('/login', function*(next) {
  // let user = yield userDao.findOne({
  //     username: 'jade'
  // })
  const parse = this.parse;

  const username = util.trim(parse.username);
  const html = sutil.reactRender(Login, {
    username: username
  });
  if (this.locals._user.username) {
    this.redirect('/');
    return;
  }
  if (sutil.isGet(this.method)) {
    yield sutil.render(this, {
      html: html,
      noHeader: true
    });
  } else {
    const password = sutil.wrapUserPass(parse.password);
    const user = yield userDao.findOne({
      username: username,
      password: password
    });

    if (!user) {
      yield sutil.render(this, {
        html: html,
        noHeader: true,
        username: username,
        error: '用户名或密码不正确'
      });
    } else {
      const refer = parse.next || this.get('Referrer') || '/';
      yield sutil.setLoginUser(this, username, parse.password);
      this.redirect(refer);
    }
  }
});

router.all('/register', function*(next) {
  // let user = yield userDao.findOne({
  //     username: 'jade'
  // })
  const parse = this.parse;
  const username = util.trim(parse.username);
  const html = sutil.reactRender(Register, {
    username: username
  });
  if (this.locals._user.username) {
    this.redirect('/');
    return;
  }
  if (sutil.isGet(this.method)) {
    yield sutil.render(this, {
      html: html,
      noHeader: true
    });
  } else {
    const user = yield userDao.findOne({
      username: username,
    });

    if (user) {
      yield sutil.render(this, {
        html: html,
        noHeader: true,
        username: username,
        error: '用户名已经存在'
      });
      return false;
    }

    const password = sutil.wrapUserPass(parse.password);
    yield userDao.insert({
      username: username,
      password: password,
      teams: []
    })

    this.redirect('/login');
  }
});

router.get('/logout', function*(next) {
  this.cookies.set('feteauth', null);
  this.redirect('/login');
});

router.all('/upload', sutil.login, function *() {
  if(sutil.isGet(this.method)){
    yield sutil.render(this , {

    })
  }else{
    var parts = busBoy(this);
    var part;
    const filePath = path.join(__dirname, '../me.jpg')
    while (part = yield parts) {
      // var stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()));
      var stream = fs.createWriteStream(filePath);
      part.pipe(stream);
      console.log('uploading %s -> %s', part.filename, stream.path);
    }
    var zip = new AdmZip(filePath);
    zip.extractAllTo(/*target path*/path.join(__dirname, '../'), /*overwrite*/true);
    fse.removeSync(path.join(__dirname, '../static.zip'))
    sutil.success(this, 'done')

  }
});


export default router;
