/**
* @Author: lancui
* @Date:   2016-06-27 17:06:00
* @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-06-27 18:06:55
*/


var io = require('socket.io')(80);
var socket = io('http://localhost');
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
