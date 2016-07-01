/**
 * @Author: lancui
 * @Date:   2016-06-22 14:06:00
 * @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-06-29 16:06:25
 */


const router = vueCommon.createRouter();
router.map({
  '': {
    name: 'main',
    component: require('./main.vue'),
    subRoutes: {
      '/api': {
        name: 'list',
        component: require('./main_list.vue')
      }
    }
  }
});

document.getElementById('fete').innerHTML = '<router-view></router-view>';
const app = Vue.extend();
router.start(app, '#fete');
