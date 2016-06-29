/**
* @Author: lancui
* @Date:   2016-06-27 17:06:00
* @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-06-29 01:06:85
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

var db = require('../common/db');
var msgDaoCC = db.get('message');

var app = require('koa')();
var server = require('http').createServer(app.callback());
var io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log('===socket connection====' + socket);
  // 获得消息个数
  socket.on('getMsgs', function(userId) {
    // msgDaoCC.find({}).then((res) => {
    //   socket.emit('updateMsgs', res);
    // });
    msgDaoCC.count({toUsers: userId, status: 0}, (err, res) => {
      if(!!err) {
        console.log('ERROR: getMsgs has error!');
        return;
      }
      socket.emit('updateMsgs', res);
    });
  });
});

server.listen(3000);
