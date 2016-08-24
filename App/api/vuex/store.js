/**
* @Author: geyuanjun
* @Date:   2016-06-29 11:33:13
* @Email:  geyuanjun.sh@superjia.com
* @Last modified by:   geyuanjun
* @Last modified time: 2016-07-12 10:46:48
*/

import Vuex from 'vuex'
import mutations from './mutations'
Vue.use(Vuex)
const state = {
  list: [],
  list_active: {},
  userId: '123',
  prdId: '',
  teamId: '',
  projectId: '',
  apiRoot: '',
  prdList: [],
  categories: []
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
