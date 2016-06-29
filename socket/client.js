/**
* @Author: lancui
* @Date:   2016-06-27 17:06:00
* @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-06-28 19:06:99
*/
const socket = require('socket.io-client')('http://localhost:3000');
socket.on('updateMsgs', (data) => {
  console.log(`==datas=${data}`);
  $('.msg-count').html(data);
});

let msgSocketTime = null;
const getMsgTask = () => {
  if (!msgSocketTime) clearTimeout(msgSocketTime);
  socket.emit('getMsgs', pageConfig.me._id);
  msgSocketTime = setTimeout(getMsgTask, 5000);
};
getMsgTask();
