/*
 * @Author: jade
 * @Date:   2016-06-26 21:50:10
 * @Last Modified by:   jade
 * @Last Modified time: 2016-06-29 11:59:05
 */

'use strict';
import {combineReducers} from 'redux';
import {
  routerStateReducer,
} from 'redux-router';
import {
    GET,
    ADD,
    ADD_SHOW,
    UPDATE,
    UPDATE_SHOW,
    DELETE,
    DELETE_SHOW,
} from './action';

function teams(state = [], action) {
    switch (action.type) {
        case GET:
            return action.teams
        case ADD:
            return [action.team, ...state]
        case UPDATE:
            return _.map(state, item => item.id == action.team.id ? action.team : item)
        case DELETE:
            return _.filter(state, item => item.id != action.team.id)
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

function updateShow(state = {updateShow: false, team: {}}, action) {
    switch (action.type) {
        case UPDATE_SHOW:
            return Object.assign({}, action);
        case UPDATE:
            return {updateShow: false, team: action.team};
        default:
            return state
    }
}

function deleteShow(state = {deleteShow: false, team: {}}, action) {
    switch (action.type) {
        case DELETE_SHOW:
            return Object.assign({}, action);
        case DELETE:
            return {deleteShow: false, team: action.team};;
        default:
            return state
    }
}
const rootReducer = combineReducers({
    router: routerStateReducer,
    teams,
    addShow,
    updateShow,
    deleteShow,
})

export default rootReducer
