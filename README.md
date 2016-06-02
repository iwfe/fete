# fete
运行准备：

1，安装mongodb，参考地址：http://www.jianshu.com/p/dd0c39bf7be4
    1）brew install mongodb
    2）mongod --config /usr/local/etc/mongod.conf

2,node环境：5.11.1

3,npm install

4,在根目录新建config.js，然后把config_template.js内容拷贝到config.js中，然后自己设置下具体参数

5,全局安装supervisor，启动命令：supervisor --harmony server.js


Q&A:
如果出现 Cannot find module 'mongodb'
http://www.jianshu.com/p/0ea7ba2bc4a1

整体架构介绍：
