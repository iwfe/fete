/**
* @Author: lancui
* @Date:   2016-06-27 17:06:00
* @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-07-05 16:07:36
*/

/** 监听message **/
const wrap = require('co-monk');
const db = require('../common/db');
const msgDao = wrap(db.get('message'));

// const server = require('http').createServer(app.callback());
// const io = require('socket.io')(server);
// let usersSocketMap = {};

let serverSocket = {
  init(app) {
    var self = this;
    const server = require('http').createServer(app.callback());
    const io = require('socket.io')(server);

    self.usersSocketMap = {};

    io.on('connection', function(socket){
      console.log(`===socket connection====${socket.id}`);
      // 用户名添加到Map
      socket.on('addToUserSocketMap', function(username){
        self.usersSocketMap[username] = socket;
        socket.username = username;
        self.sendMsg([username], false);
      });
      // test 打印io.sockets
      // for(let i in io.sockets){
      //   try{
      //     let obj = io.sockets[i];
      //     console.log(`===${i}  ${typeof obj === 'object' ? JSON.stringify(obj) : obj}`);
      //   }catch(e) {
      //   }
      // }

      // 解除连接
      socket.on('disconnect', function () {
        io.sockets.emit(`==disconnected==${socket.id} ${socket.username}`);
      });

      // 获得Socket用户的ID
      socket.emit('getUserId');
    });
    server.listen(3000);
  },
  /**
   * @param remindUsers 提醒的用户名数组
   * @param isToastr 是否显示提示文字，默认true
   */
  sendMsg(remindUsers, isToastr) {
    isToastr = isToastr === undefined ? true : isToastr;
    for(let i in remindUsers) {
      let uid = remindUsers[i],
          socket = this.usersSocketMap[uid];
      // 获得数据
      if(!socket) continue;
      msgDao.count({toUsers: {'$elemMatch': {'userId': uid, 'status': 0}}}, (err, res) => {
        if(!!err) {
          console.log('ERROR: getMsgs has error!'); return;
        }
        socket.emit('updateMsgs', {count:res, isToastr: isToastr});
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
