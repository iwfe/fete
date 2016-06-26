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
try{
    var setIterm2Badge = require('set-iterm2-badge')('FETE gulp');    
}catch(e){

}



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
        index: ['./main/index.js', './main/index.scss'],
        login: ['./main/login.js', './main/login.scss'],
        user: './user',
        team: './team',
        react_common: [
            'react',
            'react-dom',
            'react-router',
            'antd/dist/antd.css',
            './layout/layout.js',
            './layout/layout.scss'
        ]
    };


    if (entry) {
        console.log('您需要编译的模块有：' + entry);
        var arr = entry.split(',');
        entry = {
            common: map.common
        }
        for (var i = 0, len = arr.length; i < len; i++) {
            var item = arr[i];
            entry[item] = map[item];
        }
    } else {
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
            alias: {}
        },

        plugins: [
            new webpack.ProvidePlugin({
                fetch: path.resolve('./common/fetch'),
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
        ].concat(minfy),
        module: {
            loaders: [{
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    compact: false,
                    presets: ['react', 'es2015']
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
    //webpack配置文件
    var vue_config = {
        watch: isWatch,
        entry: {
            api: './api/index.js',
            vue_common: [
                'vue',
                'vue-router',
                'underscore',
                'vueCommon',
                'antd/dist/antd.css'
            ]
        },
        debug: true,

        devtool: (isProduct ? false : 'source-map'),

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
                Vue: 'vue',
                VueRouter: 'vue-router',
                vueCommon: 'vueCommon'
            }),
            new webpack.optimize.DedupePlugin(),
            new ExtractTextPlugin("[name].css"),
            new webpack.optimize.CommonsChunkPlugin('vue_common', 'vue_common.js'),
            new WebpackNotifierPlugin({
                excludeWarnings: true,
                alwaysNotify: false
            })
        ].concat(minfy),

        module: {
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
            plugins: ['transform-runtime']
        },
        vue: {
            loaders: {
                css: ExtractTextPlugin.extract('style-loader', 'css-loader'),
                less: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
                sass: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            }
        }
    };

    webpack(vue_config, function(err, stats) {
        console.log(stats.toString());
    });
});