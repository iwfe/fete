/*
 * @Author: jade
 * @Date:   2016-06-06 12:13:11
* @Last modified by:   lancui
* @Last modified time: 2016-06-29 17:06:63
 */

'use strict';
const menus = [{
    key: 'index',
    text: '首页',
    link: '/'
}, {
    key: 'msg',
    text: '消息',
    link: '/api/message',
    isVueLink: true
}, {
    key: 'api',
    text: 'API',
    link: '/api',
    isVueLink: true
}];

export default menus;
