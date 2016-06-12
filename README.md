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
如果出现 Cannot find module 'mongodb'
http://www.jianshu.com/p/0ea7ba2bc4a1

整体架构介绍：
