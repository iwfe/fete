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
  GET_MEMBER,
  INVITE_MEMBER,
  INVITE_MEMBER_SHOW,
  DELETE_MEMBER,
  DELETE_MEMBER_SHOW,
  GET_PRD,
} from './action';

function iconfonts(state = [], action) {
  switch (action.type) {
    case GET:
      return action.iconfonts
    case ADD:
      return [action.iconfont, ...state]
    case UPDATE:
      return _.map(state, item => item.id == action.iconfont.id ? action.iconfont : item)
    case DELETE:
      return _.filter(state, item => item.id != action.iconfont.id)
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

function updateShow(state = {updateShow: false, iconfont: {}}, action) {
  switch (action.type) {
    case UPDATE_SHOW:
      return Object.assign({}, action);
    case UPDATE:
      return {updateShow: false, iconfont: action.iconfont};
    default:
      return state
  }
}

function deleteShow(state = {deleteShow: false, iconfont: {}}, action) {
  switch (action.type) {
    case DELETE_SHOW:
      return Object.assign({}, action);
    case DELETE:
      return {deleteShow: false, iconfont: action.iconfont};
    default:
      return state
  }
}

function members(state = [], action) {
  switch (action.type) {
    case GET_MEMBER:
      return action.members
    case INVITE_MEMBER:
      return [action.member, ...state]
    case DELETE_MEMBER:
      return _.filter(state, item => item.username != action.member.username)
    default:
      return state
  }
}

function inviteMemberShow(state = false, action) {
  switch (action.type) {
    case INVITE_MEMBER_SHOW:
      return action.show;
    case INVITE_MEMBER:
      return false;
    default:
      return state
  }
}

function deleteMemberShow(state = {show: false, member: {}}, action) {
  switch (action.type) {
    case DELETE_MEMBER_SHOW:
      return Object.assign({}, action);
    case DELETE_MEMBER:
      return {show: false, member: action.member};
    default:
      return state
  }
}

function prds(state = [], action) {
  switch (action.type) {
    case GET_PRD:
      return action.prds
    default:
      return state
  }
}

const rootReducer = combineReducers({
  router: routerStateReducer,
  iconfonts,
  addShow,
  updateShow,
  deleteShow,
  members,
  inviteMemberShow,
  deleteMemberShow,
  prds
})

export default rootReducer
