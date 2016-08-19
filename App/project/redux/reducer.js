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
} from './action'

//选择新闻后，将state.selectedReddit设为所选选项
// function selectedReddit(state = 'reactjs', action) {
//     switch (action.type) {
//         case SELECT_REDDIT:
//             return action.reddit
//         default:
//             return state
//     }
// }

function projects(state = [], action) {
    switch (action.type) {
        case GET:
            return action.projects
        case ADD:
            return [action.project, ...state]
        case UPDATE:
            return _.map(state, item => item.id == action.project.id ? action.project : item)
        case DELETE:
            return _.filter(state, item => item.id != action.project.id)
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

function updateShow(state = {updateShow: false, project: {}}, action) {
    switch (action.type) {
        case UPDATE_SHOW:
            return Object.assign({}, action);
        case UPDATE:
            return {updateShow: false, project: action.project};
        default:
            return state
    }
}

function deleteShow(state = {deleteShow: false, project: {}}, action) {
    switch (action.type) {
        case DELETE_SHOW:
            return Object.assign({}, action);
        case DELETE:
            return {deleteShow: false, project: action.project};;
        default:
            return state
    }
}
//废弃、接收到、开始接受新闻后，将state.postsByReddit设为相关参数
// function postsByReddit(state = {}, action) {
//     switch (action.type) {
//         case INVALIDATE_REDDIT:
//         case RECEIVE_POSTS:
//         case REQUEST_POSTS:
//             return Object.assign({}, state, {
//                 [action.reddit]: posts(state[action.reddit], action)
//             })
//         default:
//             return state
//     }
// }
//将两个reducer合并成一个reducer,也就将全局的state加上postsByReddit,selectedReddit两个属性，每个属性都有自己的state
const rootReducer = combineReducers({
    projects,
    addShow,
    updateShow,
    deleteShow,
    // selectedReddit
})

export default rootReducer
