/**
 * @Author: lancui
 * @Date:   2016-06-22 14:06:00
 * @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-07-14 18:07:66
 */

const router = vueCommon.createRouter();
router.map({
  '/': {
    name: 'index',
    component: require('../main_vue/index.vue'),
    subRoutes: {
      importdb: {
        name: 'importdb',
        component: require('./import.vue')
      }
    }
  }
});

document.getElementById('fete').innerHTML = '<router-view></router-view>';
const app = Vue.extend();
router.start(app, '#fete');
