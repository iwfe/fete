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
  // change prdId, projectId, teamId
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
