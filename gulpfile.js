/**
 * @Author: geyuanjun
 * @Date:   2016-06-24 17:09:44
 * @Email:  geyuanjun.sh@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-06-29 16:06:88
 */




/**
 * Created by zyy on 15/4/29.
 * zhangyuyu@superjia.com
 //  */

var gulp = require('gulp'),
  argv = require('yargs').argv,
  fs = require('fs'),
  fse = require('fs-extra'),
  path = require('path'),
  util = require('util'),
  zip = require('gulp-zip');


// var auto = require('./automate.js');

var webpack = require("webpack"),
  ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackNotifierPlugin = require('webpack-notifier');

var isWatch = true;
var isProduct = false;
var project = '';

var entry = null;


//gulp --product
//gulp --zip
//gulp --entry index,map 个别模块的打包
gulp.task('default', function() {
  isProduct = argv.product;
  isWatch = !isProduct;
  entry = argv.entry;
  var zip = argv.zip;
  if (zip) {
    gulp.start('zip-clean');
    return;
  }

  console.log('正在处理：' + (isProduct ? '线上' : '本地') + '环境');

  fse.emptydirSync('./dist');

  gulp.start('img');

  gulp.start('webpack');

  gulp.start('sham');

  gulp.start('html');
});

//webpack静态处理
gulp.task('webpack', function(callback) {
  var minfy = [];
  isProduct && minfy.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: {
      except: ['$', 'm', 'webpackJsonpCallback']
    }
  }));

  //webpack配置文件，有几项需要动态配置的，只能写在这边
  var config = require('./build/webpack.react.config.js')
  config.watch =isWatch
  config.devtool = isProduct ? false : 'source-map'
  config.plugins.concat(minfy)

  if (entry) {
    console.log('您需要编译的模块有：' + entry);
    var arr = entry.split(',');
    entry = {
      common: config.all_entry.common
    }
    for (var i = 0, len = arr.length; i < len; i++) {
      var item = arr[i];
      entry[item] = config.all_entry[item];
    }
  } else {
    entry = config.all_entry;
  }
  config.entry = entry;

  webpack(config, function(err, stats) {
    console.log(stats.toString());
  });
});

gulp.task('img', function() {
  gulp.src([
      './img/**',
    ])
    .pipe(gulp.dest('./dist/img'));
  gulp.src([
      './global/img/**'
    ])
    .pipe(gulp.dest('./dist/img/common'));

});

gulp.task('sham', function() {
  gulp.src('./global/lib/es5-shim-sham.js').pipe(gulp.dest('./dist'));
  gulp.src('./node_modules/mockjs/dist/mock-min.js').pipe(gulp.dest('./dist'));
  gulp.src('./node_modules/mockjs/dist/mock-min.js.map').pipe(gulp.dest('./dist'));
})

gulp.task('zip', function() {
  var fullpath = './tmpdist/' + project;
  fse.removeSync('./dist/' + project + '.zip');
  fse.copySync('./dist', fullpath);
  return gulp.src('./tmpdist/**')
    .pipe(zip(project + '.zip'))
    .pipe(gulp.dest('./tmpdist'));
})

gulp.task('zip-clean', ['zip'], function() {
  fse.emptydirSync('./dist');
  fse.copySync('./tmpdist/' + project + '.zip', './dist/' + project + '.zip');
  fse.remove('./tmpdist');
})

gulp.task('img_watch', function() {
  gulp.watch(['./img/**', './global/img/**'], ['img']);
});

gulp.task('html', function() {
  gulp.src([
      './html/**',
    ])
    .pipe(gulp.dest('./dist/html'));
});

gulp.task('html_watch', function() {
  gulp.watch('./html/**', ['html']);
});

// 自动化相关
gulp.task('auto-branch', function() {
  if (!argv.name) {
    console.log('请指定版本号');
    return false;
  }

  auto.creatBranch(argv.name);
})

gulp.task('auto-upload', ['webpack'], function() {
  auto.upload();
})

gulp.task('publish', function() {
  auto.init(gulp);

  gulp.start('axtest');


  // if (!argv.name) {
  //     console.log('请指定版本号');
  //     return false;
  // }

  // if (!argv.p) {
  //     console.log('请指定环境');
  //     return false;
  // }

  // isWatch = false;

  // fse.emptydirSync('./dist');

  // gulp.start('sham');

  // auto.pull(argv.name);
  //gulp.start('webpack');
})


//webpack vue 静态处理
gulp.task('vue', function(callback) {
  isProduct = argv.product;
  isWatch = !isProduct;

  var minfy = [];
  isProduct && minfy.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
  //webpack配置文件，有几项需要动态配置的，只能写在这边
  var vue_config = require('./build/webpack.vue.config.js')
  vue_config.watch =isWatch
  vue_config.devtool = isProduct ? false : 'source-map'
  vue_config.plugins.concat(minfy)

  webpack(vue_config, function(err, stats) {
    console.log(stats.toString());
  });
});

gulp.task('server', function() {
  require('gulp-nodemon')({
    script: './server.js',
    ignore: ['dist/*', '*.vue']
  }).on('restart', function() {
    console.log('server restarted!')
  });
});
