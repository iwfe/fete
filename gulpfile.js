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
    var map = {
        main: './main',
        user: './user',
        
        common: [
            'react',
            'react-dom'
        ]
    };


    if(entry) {
        console.log('您需要编译的模块有：' + entry);
        var arr = entry.split(',');
        entry = {
            common: map.common
        }
        for(var i = 0, len = arr.length; i < len; i++) {
            var item = arr[i];
            entry[item] = map[item];
        }
    }else {
        entry = map;
    }

    //webpack配置文件
    var config = {
        watch: isWatch,
        entry: entry,
        debug: true,

        devtool: (isProduct ? false : 'source-map'),
        // devtool: false,

        output: {
            path: './dist/',
            filename: '[name].js',
            chunkFilename: '[name].min.js',
            publicPath: ''
        },

        resolve: {
            alias: {
            }
        },

        plugins: [
            new webpack.ProvidePlugin({
                React: 'react',
                ReactDom: 'react-dom'
            }),
            new webpack.optimize.DedupePlugin(),
            new ExtractTextPlugin("[name].css"),
            new WebpackNotifierPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: ['common'],
                minChunks: Infinity
            })
        ].concat(minfy),
        module: {
            loaders: [{
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    compact: false
                }
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
        }
    };


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
