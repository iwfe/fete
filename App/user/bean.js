/*
 * @Author: jade
 * @Date:   2016-06-06 17:04:44
* @Last modified by:   lancui
* @Last modified time: 2016-08-15 11:08:76
 */

'use strict';
const user = {
    _id:'',
    username: '', // 登录名
    password: '', // 密码
    sex: '', // 性别
    role: '', // 角色
    phone: '', // 手机号
    message: '', // 消息接收 默认yes
    img: '', // 头像url
    teams: [{
        id: '',
        role: 'owner|admin|member', //owner:创建者，admin:管理员，member:普通成员
        status: 'normal|invite|apply'//normal:正常,invited:邀请加入,apply:申请加入
    }]
}
