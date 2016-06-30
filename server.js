#!/usr/bin/env node
require('babel-core/register')({
  presets: ['es2015-node5', 'stage-3', 'react']
});

try{
    var setIterm2Badge = require('set-iterm2-badge')('FETE SERVER');    
}catch(e){
    
}

var app = require('./app')

console.log('服务已经启动....端口：3810');

// listen
app.listen(3810);