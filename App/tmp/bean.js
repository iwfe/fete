/*
* @Author: jade
* @Date:   2016-06-06 17:06:25
* @Last Modified by:   jade
* @Last Modified time: 2016-06-06 17:08:36
*/

'use strict';
const user = {
    _id:'',
    username: '',
    password: '',
    teams: [{
        id: '',
        role: 'owner|admin|member', //owner:创建者，admin:管理员，member:普通成员
        status: 'normal|invite|apply'//normal:正常,invited:邀请加入,apply:申请加入
    }]
}
