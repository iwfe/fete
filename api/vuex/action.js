//添加
export const add = ({ dispatch }) => {
    dispatch('ADD')
}

//删除
export const del = ({ dispatch }) => {
    dispatch('DEL')
}

//切换
export const tog = ({ dispatch },list) => {
    dispatch('TOG',list)
}