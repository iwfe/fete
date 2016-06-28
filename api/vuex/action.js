//添加
export const add = ({ dispatch },list) => {
    dispatch('ADD',list)
}

//删除
export const del = ({ dispatch }) => {
    if(confirm('确定要删除吗')){
        dispatch('DEL')
    }
}

//切换
export const tog = ({ dispatch },list) => {
    dispatch('TOG',list)
}