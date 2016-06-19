require('./index.scss');

let router = vueCommon.createRouter();
router.map({
    '/api': {
        name: 'index',
        component: require('./index.vue')
    },
    '/api/:id': {
        name: 'index',
        component: require('./index.vue')
    }
});

let app = Vue.extend({});
router.start(app, "#main");
