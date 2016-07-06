const makeAction = type => ({ dispatch }, ...args) => dispatch(type, ...args)
export const add = makeAction('ADD_LIST')
export const tog = makeAction('TOG_LIST')
export const changeFilter = makeAction('CHANGE_FILTER')
export const emptyList = makeAction('EMPTY_LIST')
export const delByIndex = makeAction('DEL_BY_INDEX')
export const blurList = makeAction('BLUR_LIST')
export const del = makeAction('DEL_LIST')
