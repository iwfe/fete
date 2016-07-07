/*
 * @Author: wjs
 * @Date:   2016-07-07 13:12:16
 * @Last Modified by:   wjs
 * @Last Modified time: 2016-07-07 13:17:39
 */

var config = require('./webpack.vue.config.js'),
  webpack = require('webpack')

config.watch = true
config.devtool = 'source-map'
config.plugins.push(new webpack.HotModuleReplacementPlugin())
config.devServer = {
  hot: true,
  noInfo: true
}
config.output.contentBase = './dist/'
config.output.publicPath = '/static/'

module.exports = config
