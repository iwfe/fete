<!--
@Author: geyuanjun
@Date:   2016-06-16 10:06:25
@Email:  geyuanjun.sh@superjia.com
@Last modified by:   geyuanjun
@Last modified time: 2016-06-22 12:23:12
-->



# fete
运行准备：

1， 已经安装好了远程的Mongodb，可以直接连接
    如果自己本地想安装可以参考如下：
    mac安装mongodb，参考地址：http://www.jianshu.com/p/dd0c39bf7be4
    1）brew install mongodb
    2）mongod --config /usr/local/etc/mongod.conf

    centeros安装mongodb参考：http://www.jianshu.com/p/0a4f9acf811d

    新增一个用户：db.user.insert({username:'jade',password:'d04a711547058ed0efe27d8c5203f58f'})

    登录测试用户：
    用户名：jade
    密码：111111



2,node环境：5.11.1

3,npm install

4,在根目录新建config.js，然后把config_template.js内容拷贝到config.js中，然后自己设置下具体参数

5,全局安装supervisor，启动命令：supervisor --harmony server.js


Q&A:
1, 如果出现 Cannot find module 'mongodb'
    http://www.jianshu.com/p/0ea7ba2bc4a1

2, 如果安装node-sass好，后使用不了，可能是需要rebuild下，该问题出现在node 6.x版本
    `npm rebuild node-sass`

3, 在运行启动命令：supervisor --harmony server.js后，如果出现类似以下报错
```
assert.js:89
  throw new assert.AssertionError({
  ^
AssertionError: app.use() requires a generator function
    at Application.app.use (E:\workspace\node_modules\koa\lib\application.js:105
:5)
    at Object.<anonymous> (E:\workspace\iForm\index.js:13:5)
```
检查node_modules文件夹下安装的`koa-views`包的版本，本项目所依赖的koa-views版本为4.1.0
解决方案：
`npm install koa-views@4.1.0`



整体架构介绍：
