/**
 * Created by zyy on 15/7/7.
 * zhangyuyu@superjia.com
 */
import fs from 'fs'
import path from 'path'
import _ from 'underscore'
import busBoy from 'co-busboy'
import Router from 'koa-router';
import sutil from '../../common/sutil'
const router = new Router({ prefix: '/user'})
const wrap = require('co-monk')
const db = require('../../common/db')
const userDao = wrap(db.get('user'))

// PRD
router.get('/profile', sutil.login, function*(next) {
  yield sutil.render(this, {})
})

router.get('/data', sutil.login, function*(next) {
  let name = this.locals._user.username
  let data = yield userDao.findOne({username: name})
  sutil.success(this, {
    sex: data.sex,
    role: data.role,
    phone: data.phone,
    username: data.username,
    message: data.message,
    remarks: data.remarks
  })
  // if(user) {
  //   sutil.success(this, sutil.wrapUser(user, ['teams']));
  // }else {
  //   sutil.failed(this, 10004);
  // }
})
router.post('/upload', sutil.login, function*(next) {
  const {sex, name, phone, role, message, remarks} = this.parse
  if (!sex || !name || !phone || !role) {
    sutil.failed(this, 1003)
  } else {
    const data = {
      sex: sex,
      role: role,
      phone: phone,
      username: name,
      message: message
    }
    if (remarks) data.remarks = remarks
    let updateResult = yield userDao.update({ username: name }, {
      $set: data
    })
    if (updateResult) {
      sutil.success(this)
    }
  }
})

router.post('/uploadPassword', sutil.login, function*(next) {
  const { oldPassword, newPassword, username } = this.parse
  if (!oldPassword || !newPassword || !username) {
    sutil.failed(this)
  } else {
    const password = sutil.wrapUserPass(oldPassword)
    const user = yield userDao.findOne({ username: username })
    if (user.password === password) {
      const newPassworddate = sutil.wrapUserPass(newPassword)
      const result = yield userDao.update({ username: username }, {
        $set: {password: newPassworddate}
      })
      sutil.success(this)
    } else {
      sutil.failed(this)
    }
  }
})

router.post('/uploadPic', sutil.login, function*(next) {
  const parts = busBoy(this)
  const username = this.locals._user.username
  let part
  while (part = yield parts) {
    const type = part.filename.substr(part.filename.lastIndexOf('.'))
    const filePath = path.join(__dirname, '../../assets/avatar/' + username + type)
    if (type === '.jpg' || type === '.png' || type ==='gif' || type === '.jpeg') {
      const stream = fs.createWriteStream(filePath)
      part.pipe(stream)
      const result = yield userDao.update({ username: username }, {
        $set: {img: username + type}
      })
      if (result) sutil.success(this, username + type)
      // console.log('uploading %s -> %s', part.filename, stream.path)
    } else {
      sutil.failed(this)
    }
  }
})

//.replace(/[^ \n.,]+/g, m=>m.length > 5 ? m.replace(/./g, '?'): m)

export default router;
