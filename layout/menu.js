/*
 * @Author: jade
 * @Date:   2016-06-06 12:13:11
 * @Last Modified by:   jade
 * @Last Modified time: 2016-06-06 16:22:56
 */

'use strict';
const menus = [{
    key: 'index',
    text: '首页',
    link: '/'
}, {
    key: 'msg',
    text: '消息',
    link: '/msg',
    subMenus: [{
        key: 'index',
        text: '首页',
        link: '/'
    }]
}, {
    key: 'api',
    text: 'API',
    link: '/api',
    isVueLink: true
}];

export default menus;
