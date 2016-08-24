const makeAction = type => ({ dispatch }, ...args) => dispatch(type, ...args)
export const tog = makeAction('TOG_LIST')
export const changeFilter = makeAction('CHANGE_FILTER')
export const emptyList = makeAction('EMPTY_LIST')
export const delByIndex = makeAction('DEL_BY_INDEX')
export const blurList = makeAction('BLUR_LIST')
export const del = makeAction('DEL_LIST')
export const setPrdList = makeAction('SET_PRDlIST')
export const setCategories = makeAction('SET_CATEGORIES')
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
export const copy = e => {
  const t = e.target
  const c = t.dataset.copytarget
  const inp = (c ? document.querySelector(c) : null)
  if (inp && inp.select) {
    inp.select()
    try {
      document.execCommand('copy')
    } catch (err) {
      alert('please press Ctrl/Cmd+C to copy')
    }
    document.activeElement.blur()
    toastr.info('已复制到剪贴板！', '', { positionClass: 'toast-top-center' })
  }
}
document.body.addEventListener('click', copy, true)
