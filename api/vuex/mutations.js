/**
* @Author: geyuanjun
* @Date:   2016-07-11 17:33:0
* @Email:  geyuanjun.sh@superjia.com
* @Last modified by:   geyuanjun
* @Last modified time: 2016-07-12 11:02:52
*/

export default {
  SET_LIST(state, list) {
    state.list = list
  },
  SET_PRDlIST(state, arr) {
    state.prdList = arr
  },
  ADD_LIST(state, list) {
    if (!list || !list.url) {
      list = {
        url: '/',
        title: '-',
        method: '-',
        lastModify: '-'
      }
    }
    state.list.unshift(list)
    state.list_active = list
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
  },
  SET_DEFAULT_URL(state, url) {
    state.defaultUrl = url
  },
  SET_DEFAULT_TITLE(state, title) {
    state.defaultTitle = title
  },
  SET_DEFAULT_METHOD(state, method) {
    state.defaultMethod = method
  },
  SET_DEFAULT_DATA(state, data) {
    state.defaultData = data
  }
}
