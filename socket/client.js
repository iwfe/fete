/**
* @Author: lancui
* @Date:   2016-06-27 17:06:00
* @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-07-01 19:07:30
*/
const socket = require('socket.io-client')('http://localhost:3000');

socket.on('getUserId', (data) => {
  socket.emit('addToUserSocketMap', pageConfig.me.username);
});
socket.on('updateMsgs', (data) => {
  console.log(`==datas=${data}`);
  $('.msg-count').html(data);
});


// let msgSocketTime = null;
// const getMsgTask = () => {
//   if (!msgSocketTime) clearTimeout(msgSocketTime);
//   socket.emit('sendMsgs', pageConfig.me.username);
//   msgSocketTime = setTimeout(getMsgTask, 5000);
// };
// getMsgTask();
