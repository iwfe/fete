import * as types from './mutation-types'
export default {
  [types.ADD_LIST](state, list) {
    let objs = list || {
      url: '',
      title: '',
      method: ''
    };
    state.list.unshift(objs);
    if(!list){
      state.list_active = objs;
    }
  },
  [types.DEL_LIST](state) {
    if (state.list_active) {
      state.list.$remove(state.list_active)
    }
  },
  [types.TOG_LIST](state, list) {
    if (state.list_active === list) {
      state.list_active = {};
    } else {
      state.list_active = list
    }
  }
}