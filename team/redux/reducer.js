/*
 * @Author: jade
 * @Date:   2016-06-26 21:50:10
 * @Last Modified by:   jade
 * @Last Modified time: 2016-06-27 22:54:42
 */

'use strict';
import {combineReducers} from 'redux'
import {
    GET,
    ADD,
    ADD_SHOW,
    UPDATE,
    UPDATE_SHOW,
    DELETE
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

function teams(state = [], action) {
    switch (action.type) {
        case GET:
            return action.teams
        case ADD:
            return state.push(action.team)
        case UPDATE:
            return {
                teams: _.map(state, item => item.id == action.team ? action.team : item)
            }
        case DELETE:
            return {
                teams: _.filter(state, item => item.id != action.team.id)
            }
        default:
            return state
    }
}

function addShow(state = false, action) {
    switch (action.type) {
        case
        ADD_SHOW:
            return true;
        default:
            return state
    }
}

function updateShow(state = false, action) {
    switch (action.type) {
        case
        UPDATE_SHOW:
            return action.team;
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
    teams,
    addShow,
    updateShow
    // selectedReddit
})

export default rootReducer
