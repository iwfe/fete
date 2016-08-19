/*
 * @Author: wjs
 * @Date:   2016-06-30 18:48:33
* @Last modified by:   lancui
* @Last modified time: 2016-08-19 19:08:72
 */

var path = require('path'),
  webpack = require("webpack"),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  WebpackNotifierPlugin = require('webpack-notifier')

module.exports = {
  // watch: isWatch,
  entry: {
    api: './App/api/index.js',
    message: './App/message/index.js',
    importdb: './App/importdb/index.js',
    vue_common: [
      'vue',
      'vue-router',
      'underscore',
      'vueCommon',
      'jquery',
      'toastr/toastr.less',
      'toastr',
      'clipboard',
      './socket/client.js',
      'semantic-ui/dist/components/reset.css',
      'semantic-ui/dist/components/transition.css',
      'semantic-ui/dist/components/transition.js',
      'semantic-ui/dist/components/dropdown.css',
      'semantic-ui/dist/components/dropdown.js',
      'semantic-ui/dist/components/menu.css',
      'semantic-ui/dist/components/table.css',
      'semantic-ui/dist/components/modal.css',
      'semantic-ui/dist/components/modal.js',
      'semantic-ui/dist/components/checkbox.min.css',
      'semantic-ui/dist/components/checkbox.min.js',
      'semantic-ui/dist/components/button.min.css',
      'semantic-ui/dist/components/container.min.css',
      'semantic-ui/dist/components/divider.min.css',
      'semantic-ui/dist/components/header.min.css',
      'semantic-ui/dist/components/icon.min.css',
      'semantic-ui/dist/components/form.min.css',
      'semantic-ui/dist/components/grid.min.css',
      'semantic-ui/dist/components/input.min.css',
      'semantic-ui/dist/components/label.min.css',
      'semantic-ui/dist/components/list.min.css',
      'semantic-ui/dist/components/breadcrumb.min.css',
      './layout/layout.scss'
    ]
  },
  debug: true,

  // devtool: (isProduct ? false : 'source-map'),

  output: {
    path: './dist/',
    filename: '[name].js',
    publicPath: ''
  },

  resolve: {
    alias: {
      vueCommon: path.resolve('./common/vue_common.js')
    }
  },

  plugins: [
    new webpack.ProvidePlugin({
      _: 'underscore',
      $: 'jquery',
      jQuery: 'jquery',
      toastr: 'toastr',
      Clipboard: 'clipboard',
      fetch: path.resolve('./common/fetch'),
      Vue: 'vue',
      VueRouter: 'vue-router',
      vueCommon: 'vueCommon',
      jsonlint: 'jsonlint',
      CodeMirror: 'codemirror'
    }),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin("[name].css"),
    new webpack.optimize.CommonsChunkPlugin('vue_common', 'vue_common.js'),
    new WebpackNotifierPlugin({ excludeWarnings: true, alwaysNotify: true })
  ],

  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: "eslint-loader",
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.js[x]?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
    }, {
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg)$/,
      loader: "file-loader?name=[name]_[sha512:hash:base64:7].[ext]"
    }]
  },
  babel: {
    presets: ['es2015', 'stage-3'],
    plugins: ['transform-runtime'],
    cacheDirectory: '.tmp'
  },
  vue: {
    loaders: {
      js: 'babel!eslint',
      css: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      less: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
      sass: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
    }
  },
  eslint: {
    failOnWarning: false
  }
}
