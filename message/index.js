/**
 * @Author: lancui
 * @Date:   2016-06-22 14:06:00
 * @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-06-29 16:06:70
 */

const router = vueCommon.createRouter();
router.map({
  '/': {
    name: 'index',
    component: require('../main_vue/index.vue'),
    subRoutes: {
      message: {
        name: 'message',
        component: require('./message.vue')
      }
    }
  }
});

document.getElementById('fete').innerHTML = '<router-view></router-view>';
const app = Vue.extend();
router.start(app, '#fete');

require('../socket/client.js')