/*
 * @Author: jade
 * @Date:   2016-06-26 21:50:10
 * @Last Modified by:   jade
 * @Last Modified time: 2016-06-29 11:59:05
 */

'use strict';
import {combineReducers} from 'redux'
import {
    GET,
    ADD,
    ADD_SHOW,
    UPDATE,
    UPDATE_SHOW,
    DELETE,
    DELETE_SHOW,
} from './Actions'

function prds(state = [], action) {
    switch (action.type) {
        case GET:
            return action.prds
        case ADD:
            return [action.prd, ...state]
        case UPDATE:
            return _.map(state, item => item.id == action.prd.id ? action.prd : item)
        case DELETE:
            return _.filter(state, item => item.id != action.prd.id)
        default:
            return state
    }
}

function addShow(state = false, action) {
    switch (action.type) {
        case ADD_SHOW:
            return action.addShow;
        case ADD:
            return false;
        default:
            return state
    }
}

function updateShow(state = {updateShow: false, prd: {}}, action) {
    switch (action.type) {
        case UPDATE_SHOW:
            return Object.assign({}, action);
        case UPDATE:
            return {updateShow: false, prd: action.prd};
        default:
            return state
    }
}

function deleteShow(state = {deleteShow: false, prd: {}}, action) {
    switch (action.type) {
        case DELETE_SHOW:
            return Object.assign({}, action);
        case DELETE:
            return {deleteShow: false, prd: action.prd};;
        default:
            return state
    }
}

//将两个reducer合并成一个reducer,也就将全局的state加上postsByReddit,selectedReddit两个属性，每个属性都有自己的state
const rootReducer = combineReducers({
    prds,
    addShow,
    updateShow,
    deleteShow,
    // selectedReddit
})

export default rootReducer
