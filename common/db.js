/**
 * Created by zyy on 15/6/30.
 * zhangyuyu@superjia.com
 */
var monk = require('monk')

var config = require('../config')

var db = monk(config.mongodbConnection)

module.exports = db;