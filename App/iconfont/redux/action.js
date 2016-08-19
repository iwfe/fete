/*
 * @Author: jade
 * @Date:   2016-06-26 21:49:54
 * @Last Modified by:   jade
 * @Last Modified time: 2016-06-29 11:55:07
 */

'use strict';

// export const REQUEST = 'REQUEST';
export const GET = 'GET';
export const ADD_SHOW = 'ADD_SHOW';
export const ADD = 'ADD';
export const UPDATE = 'UPDATE';
export const UPDATE_SHOW = 'UPDATE_SHOW';
export const DELETE = 'DELETE';
export const DELETE_SHOW = 'DELETE_SHOW';
export const GET_MEMBER= 'GET_MEMBER';
export const INVITE_MEMBER= 'INVITE_MEMBER';
export const INVITE_MEMBER_SHOW= 'INVITE_MEMBER_SHOW';
export const DELETE_MEMBER= 'DELETE_MEMBER';
export const DELETE_MEMBER_SHOW= 'DELETE_MEMBER_SHOW';
export const GET_PRD = 'GET_PRD';

export function getIconfonts() {
    return dispatch => {
        // dispatch(request())
        return fetch('/iconfont/data')
            .then(json => dispatch({
                type: GET,
                iconfonts: json.data
            }))
    }
}

export function addShow(addShow) {
    return {
        type: ADD_SHOW,
        addShow: addShow
    }
}

export function addIconfont(iconfont) {
    return dispatch => {
        return fetch('/iconfont/data', {
            method: 'post',
            body: iconfont
        })
            .then(json => dispatch({
                type: ADD,
                iconfont: json.data
            }))
    }
}

export function updateShow(updateShow, iconfont) {
    return {
        type: UPDATE_SHOW,
        updateShow: updateShow,
        iconfont: iconfont
    }
}

export function updateIconfont(iconfont) {
    return dispatch => {
        // dispatch(request())
        return fetch('/iconfont/data', {
            method: 'put',
            body: iconfont
        })
            .then(json => dispatch({
                type: UPDATE,
                iconfont: json.data
            }))
    }
}

export function deleteIconfont(iconfont) {
    return dispatch => {
        // dispatch(request())
        return fetch('/iconfont/data', {
            method: 'delete',
            body: {
                id: iconfont.id
            }
        })
            .then(json => dispatch({
                type: DELETE,
                iconfont: iconfont
            }))
    }
}

export function deleteShow(deleteShow, iconfont) {
    return {
        type: DELETE_SHOW,
        deleteShow: deleteShow,
        iconfont: iconfont
    }
}

/*********member相关*********/
export function getMembers(iconfont) {
  return dispatch => {
    // dispatch(request())
    return fetch('/iconfont/member',
      {
        body: {
          iconfontId: iconfont.id
        }
      })
      .then(json => dispatch({
        type: GET_MEMBER,
        members: json.data
      }))
  }
}

export function inviteMemberShow(show) {
  return {
    type: INVITE_MEMBER_SHOW,
    show: show
  }
}

export function inviteMember(iconfont, member) {
  return dispatch => {
    return fetch('/iconfont/member/invited', {
      method: 'post',
      body: Object.assign({iconfontId: iconfont.id}, member)
    })
      .then(json => dispatch({
        type: INVITE_MEMBER,
        member: json.data
      }))
  }
}

export function deleteMember(iconfont, member) {
  return dispatch => {
    // dispatch(request())
    return fetch('/iconfont/member', {
      method: 'delete',
      body: {
        username: member.username,
        iconfontId: iconfont.id
      }
    })
      .then(json => dispatch({
        type: DELETE_MEMBER,
        member: member
      }))
  }
}

export function deleteMemberShow(show, member) {
  return {
    type: DELETE_MEMBER_SHOW,
    show: show,
    member: member
  }
}

/**********prd相关**************/
export function getPrds(iconfont, filter) {
  return dispatch => {
    return fetch('/iconfont/prd',
      {
        body: {
          iconfontId: iconfont.id,
          filter: filter
        }
      })
      .then(json => dispatch({
        type: GET_PRD,
        prds: json.data
      }))
  }
}
