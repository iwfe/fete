#!/usr/bin/env node
require('babel-core/register')({
  presets: ['es2015-node5', 'stage-3', 'react']
});
var app = require('./app')

console.log('服务已经启动....端口：3810');

// listen
app.listen(3810);