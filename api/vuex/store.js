'use strict';
let Vuex = require('vuex');
const state = {
    list: [],
    list_active:{}
}

const mutations = {
    ADD(state) { //添加
        const list = {
            name: '',
            url: '',
            method:''
        }
        state.list.unshift(list);
        state.list_active = list;
    },
    DEL(state) { //删除
        if(state.list_active){
            state.list.$remove(state.list_active)
        }else{
            log(111)
        }
    },
    TOG(state, list) { //选中
        if(state.list_active==list){
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