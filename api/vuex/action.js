export const add = ({ dispatch }, list) => {
  dispatch('ADD', list)
}

export const del = ({ dispatch }) => {
  if (confirm('确定要删除吗')) {
    dispatch('DEL')
  }
}

export const tog = ({ dispatch }, list) => {
  dispatch('TOG', list)
}

export const changeFilter = ({ dispatch }, params) => {
  dispatch('CHANGE_FILTER', params)
}

export const emptyList = ({ dispatch }) => {
  dispatch('EMPTY_LIST')
}

export const delByIndex = ({ dispatch }, index) => {
  dispatch('DEL_BY_INDEX')
}

export const blurList = ({ dispatch }) => {
  dispatch('BLUR_LIST')
}

