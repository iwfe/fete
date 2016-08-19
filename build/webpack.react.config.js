/*
 * @Author: wjs
 * @Date:   2016-07-04 11:23:43
* @Last modified by:   lancui
* @Last modified time: 2016-07-05 11:07:50
 */

var path = require('path'),
  webpack = require("webpack"),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  WebpackNotifierPlugin = require('webpack-notifier')


// react webpack配置文件
module.exports = {
  debug: true,

  // 新增的入口都加到这里，gulp 任务里会把 all_entry 映射成 entry
  all_entry: {
    index: ['./App/main/index.js', './App/main/index.scss'],
    login: ['./App/main/login.js', './App/main/login.scss'],
    register: ['./App/main/register.js', './App/main/register.scss'],
    user: './App/user',
    team: './App/team',
    project: './App/project',
    prd: './App/prd',
    upload: './App/main/upload.jsx',
    react_common: [
      'react',
      'react-dom',
      'react-router',
      'antd/dist/antd.css',
      './App/layout/layout.js',
      './App/layout/layout.scss',
      './socket/client.js',
      'toastr/toastr.less',
      'toastr',
    ]
  },

  output: {
    path: './dist/',
    filename: '[name].js',
    chunkFilename: '[name].min.js',
    publicPath: ''
  },

  resolve: {
    alias: {}
  },

  plugins: [
    new webpack.ProvidePlugin({
      fetch: path.resolve('./common/fetch'),
      _: 'underscore',
      $: 'jquery',
      jQuery: 'jquery',
      toastr: 'toastr'
        // React: 'react',
        // ReactDom: 'react-dom'
    }),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin("[name].css"),
    new WebpackNotifierPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['react_common'],
      minChunks: Infinity
    })
  ],
  module: {
    loaders: [{
      test: /\.js[x]?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap&-convertValues')
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-convertValues!less-loader')
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap&-convertValues!sass-loader?sourceMap')
    }, {
      test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg|swf)$/,
      loader: "file-loader?name=[name]_[sha512:hash:base64:7].[ext]"
    }, {
      test: /\.html/,
      loader: "html-loader?" + JSON.stringify({
        minimize: false
      })
    }]
  },
  babel: {
    presets: ['react', 'es2015', 'stage-0'],
    compact: false
  }
}
