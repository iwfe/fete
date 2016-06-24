require('./index.scss');

let router = vueCommon.createRouter();
router.map({
    '/api': {
        name: 'index',
        component: require('./index.vue')
    }
});

document.getElementById('fete').innerHTML = '<router-view></router-view>';
let app = Vue.extend({});
router.start(app, "#fete");
