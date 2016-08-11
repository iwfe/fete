const makeAction = type => ({ dispatch }, ...args) => dispatch(type, ...args)
export const tog = makeAction('TOG_LIST')
export const changeFilter = makeAction('CHANGE_FILTER')
export const emptyList = makeAction('EMPTY_LIST')
export const delByIndex = makeAction('DEL_BY_INDEX')
export const blurList = makeAction('BLUR_LIST')
export const del = makeAction('DEL_LIST')
export const add = ({ dispatch }, callback) => {
  dispatch('ADD_LIST', callback)
}
export const handler = e => {
  e.returnValue = '你确定要离开'
}
export const setList = makeAction('SET_LIST')
export const addEvent = () => {
  window.addEventListener('beforeunload', handler)
}
export const removeEvent = () => {
  window.removeEventListener('beforeunload', handler)
}
export const setTitle = makeAction('SET_DEFAULT_URL')
export const setUrl = makeAction('SET_DEFAULT_URL')
export const setMethod = makeAction('SET_DEFAULT_URL')
export const setData = makeAction('SET_DEFAULT_URL')
