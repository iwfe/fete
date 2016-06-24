/**
* @Author: lancui
* @Date:   2016-06-22 14:06:00
* @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-06-24 13:06:28
*/



require('./index.scss');

let router = vueCommon.createRouter();
router.map({
    '/api': {
        name: 'index',
        component: require('./index.vue')
    },
    '/api/message': {
        name: 'message',
        component: require('./message.vue')
    }
});

let app = Vue.extend({});
router.start(app, "#fete");
