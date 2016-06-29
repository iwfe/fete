/**
* @Author: geyuanjun
* @Date:   2016-06-29 11:33:13
* @Email:  geyuanjun.sh@superjia.com
* @Last modified by:   geyuanjun
* @Last modified time: 2016-06-29 16:03:5
*/
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  list: [],
  list_active: {},
  userId: '123',
  userName: 'geyuanjun'
}

const mutations = {
  ADD(State, list) { // 添加
    if (!list._id) {
      list = {
        url: '-',
        title: '-',
        method: '-'
      }
    }
    State.list.unshift(list);
  },
  DEL(State) { // 删除
    if (State.list_active) {
      State.list.$remove(State.list_active)
    } else {
      // console.log(str)
    }
  },
  TOG(State, list) { // 选中
    if (State.list_active === list) {
      State.list_active = {};
    } else {
      State.list_active = list
    }
  }
}

export default new Vuex.Store({
  state,
  mutations
})
