/**
* @Author: lancui
* @Date:   2016-06-27 17:06:00
* @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-07-05 14:07:78
*/
const socket = require('socket.io-client')('http://localhost:3000');

socket.on('getUserId', (data) => {
  socket.emit('addToUserSocketMap', pageConfig.me.username);
});
socket.on('updateMsgs', (data) => {
  $('.msg-count').html(data.count);
  if (data.isToastr) {
    toastr.success('您有新的消息！');
  }
});


// let msgSocketTime = null;
// const getMsgTask = () => {
//   if (!msgSocketTime) clearTimeout(msgSocketTime);
//   socket.emit('sendMsgs', pageConfig.me.username);
//   msgSocketTime = setTimeout(getMsgTask, 5000);
// };
// getMsgTask();
