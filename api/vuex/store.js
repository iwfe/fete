/**
* @Author: geyuanjun
* @Date:   2016-06-29 11:33:13
* @Email:  geyuanjun.sh@superjia.com
* @Last modified by:   chenjiangsong
* @Last modified time: 2016-07-05 11:07:56
*/
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  list: [],
  list_active: {},
  userId: '123',
  userName: 'geyuanjun',
  prdId: '111',
  teamId: '2222',
  projectId: '333'
}

const mutations = {
  ADD(State, list) { // 添加
    if (!list.url) {
      list = {
        id: '',
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
      State.list_active = list;
    }
  },

  // change prdId, projectId, teamId
  CHANGE_FILTER(State, params) {
    State = _.extend(State, params)
  },
  EMPTY_LIST(State) {
    State.list = []
    State.list_active = {}
  }
}
const outputModel = [
  {
    key: '', // 属性名
    dataType: '', // 属性类型
    comment: '', // 说明
    mock: '', // mock规则
    children: [ // 子元素 （可选，只有dataType是Array，Object才会有）
      {
        key: '',
        dataType: '',
        comment: '',
        mock: ''
      }
    ]
  }
]
// const editOutputModel = {
//   SET() {
//
//   }
// }
export default new Vuex.Store({
  state,
  mutations,
  outputModel
})
