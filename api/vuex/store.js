/**
* @Author: geyuanjun
* @Date:   2016-06-29 11:33:13
* @Email:  geyuanjun.sh@superjia.com
* @Last modified by:   geyuanjun
* @Last modified time: 2016-06-29 11:40:39
*/
import Vuex from 'vuex'
Vue.use(Vuex)

const listState = {
  list: [],
  list_active: {}
}

const mutations = {
  ADD(state, list) { // 添加
    if (!list) {
      list = {
        url: '',
        title: '',
        method: ''
      }
    }
    if (!state.list) {
      state.list = [];
    }
    state.list.unshift(list);
    state.list_active = list;
  },
  DEL(state) { // 删除
    if (state.list_active) {
      state.list.$remove(state.list_active)
    } else {
      // console.log(str)
    }
  },
  TOG(state, list) { // 选中
    if (state.list_active === list) {
      state.list_active = {};
    } else {
      state.list_active = list
    }
  }
}

export default new Vuex.Store({
  listState,
  mutations
})
