/**
* @Author: geyuanjun
* @Date:   2016-07-11 17:33:0
* @Email:  geyuanjun.sh@superjia.com
* @Last modified by:   geyuanjun
* @Last modified time: 2016-07-12 11:02:52
*/

export default {
  ADD_LIST(state, list) {
    if (!list || !list.url) {
      list = {
        url: '/',
        title: '-',
        method: '-'
      }
    }
    state.list.unshift(list);
  },
  DEL_LIST(state) {
    if (state.list_active) {
      state.list.splice(state.list.indexOf(state.list_active), 1);
    }
  },
  TOG_LIST(state, list) {
    state.list_active = list;
  },
  BLUR_LIST(state) {
    state.list_active = {};
  },
  // change prdId, projectId, teamId, apiRoot
  CHANGE_FILTER(state, params) {
    state = _.extend(state, params)
  },
  EMPTY_LIST(state) {
    state.list = []
    state.list_active = {}
  },
  DEL_BY_INDEX(state, index) {
    state.list.splice(index, 1)
  }
}
