/**
 * @Author: lancui
 * @Date:   2016-06-22 14:06:00
 * @Email:  lancui@superjia.com
 * @Last modified by:   lancui
 * @Last modified time: 2016-06-24 15:06:36
 */

require('./index.scss');
const router = vueCommon.createRouter();
router.map({
  '/api': {
    name: 'index',
    component: require('./index.vue'),
    subRoutes: {
      '': {
        name: 'list',
        component: require('./main.vue')
      },
      '/message': {
        name: 'message',
        component: require('./message.vue')
      }
    }
  }
});

document.getElementById('fete').innerHTML = '<router-view></router-view>';
const app = Vue.extend();
router.start(app, '#fete');
