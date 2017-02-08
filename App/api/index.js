/**
 * @Author: lancui
 * @Date:   2016-06-22 14:06:00
 * @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-08-18 13:08:12
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
      },
      '/api/all': {
        name: 'list',
        component: require('./main_list.vue')
      },
      '/api/j2j': {
        name: 'java2json',
        component: require('./java2json.vue')
      },
      '/api/detail_preview': {
        name: 'detail_preview',
        component: require('./detail_preview.vue')
      }
    }
  }
});

document.getElementById('fete').innerHTML = '<router-view></router-view>';
const app = Vue.extend();
router.start(app, '#fete');
