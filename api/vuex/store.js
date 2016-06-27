'use strict';
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    list: [],
    list_active:{}
}

const mutations = {
    ADD(state,list) { //添加
        if(!list){
            list = {
                url: '',
                title: '',
                method:''
            }
        }
        state.list.unshift(list);
        // state.list_active = list;
    },
    DEL(state) { //删除
        if(state.list_active){
            state.list.$remove(state.list_active)
        }else{
            console.log(str)
        }
    },
    TOG(state, list) { //选中
        if(state.list_active == list){
            state.list_active = {};
        }else{
            state.list_active = list
        }
    }
}

export default new Vuex.Store({
    state,
    mutations
})