/**
* @Author: lancui
* @Date:   2016-06-27 17:06:00
* @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-07-01 19:07:69
*/

// var app = require('koa')();
// var server = require('http').createServer(app.callback());
// var io = require('socket.io')(server);
// server.listen(3000);
//
// io.on('connection', function(){
//   // socket.emit('updateMsg', { hello: 'world' });
//   //  socket.on('my other event', function (data) {
//   //    console.log(data);
//   //  });
//   console.log('===connection===');
// });
//
// let socket = io('http://localhost');
// socket.on('updateMsg', function (data) {
//   console.log(data);
// });


/** 监听message **/
const wrap = require('co-monk');
const db = require('../common/db');
const userMsgDao = wrap(db.get('userMessage'));

// const server = require('http').createServer(app.callback());
// const io = require('socket.io')(server);
// let usersSocketMap = {};

let serverSocket = {
  init(app) {
    var self = this;
    const server = require('http').createServer(app.callback());
    const io = require('socket.io')(server);

    let _usersSocketMap = this.usersSocketMap = {};

    io.on('connection', function(socket){
      console.log(`===socket connection====${JSON.stringify(this.usersSocketMap)}`);
      // 用户名添加到Map
      socket.on('addToUserSocketMap', function(username){
        console.log('===addToUserSocketMap===');
        _usersSocketMap[username] = socket;
        socket.username = username;
        self.sendMsg([username]);
      });

      // 解除连接
      socket.on('disconnect', function () {
        io.sockets.emit('==disconnected==' + socket.id);
      });

      // 获得Socket用户的ID
      socket.emit('getUserId');
    });
    server.listen(3000);
  },
  sendMsg(remindUsers) {
    for(let i in remindUsers) {
      let uid = remindUsers[i],
          socket = this.usersSocketMap[uid];
      // 获得数据
      userMsgDao.count({userId: uid, status: 0}, (err, res) => {
        if(!!err) {
          console.log('ERROR: getMsgs has error!'); return;
        }
        socket.emit('updateMsgs', res);
      });
    }
  }
}
module.exports  = serverSocket;

/** end 监听message **/

// io.on('connection', function(socket){
//   console.log('===socket connection====' + socket);
//   // 获得消息个数
//   socket.on('getMsgs', function(userId) {
//     // msgDaoCC.find({}).then((res) => {
//     //   socket.emit('updateMsgs', res);
//     // });
//     msgDaoCC.count({toUsers: userId, status: 0}, (err, res) => {
//       if(!!err) {
//         console.log('ERROR: getMsgs has error!');
//         return;
//       }
//       socket.emit('updateMsgs', res);
//     });
//   });
// });
