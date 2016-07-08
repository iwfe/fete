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

export function getTeams() {
    return dispatch => {
        // dispatch(request())
        return fetch('/team/data')
            .then(json => dispatch({
                type: GET,
                teams: json.data
            }))
    }
}

export function addShow(addShow) {
    return {
        type: ADD_SHOW,
        addShow: addShow
    }
}

export function addTeam(team) {
    return dispatch => {
        return fetch('/team/data', {
            method: 'post',
            body: team
        })
            .then(json => dispatch({
                type: ADD,
                team: json.data
            }))
    }
}

export function updateShow(updateShow, team) {
    return {
        type: UPDATE_SHOW,
        updateShow: updateShow,
        team: team
    }
}

export function updateTeam(team) {
    return dispatch => {
        // dispatch(request())
        return fetch('/team/data', {
            method: 'put',
            body: team
        })
            .then(json => dispatch({
                type: UPDATE,
                team: json.data
            }))
    }
}

export function deleteTeam(team) {
    return dispatch => {
        // dispatch(request())
        return fetch('/team/data', {
            method: 'delete',
            body: {
                id: team.id
            }
        })
            .then(json => dispatch({
                type: DELETE,
                team: team
            }))
    }
}

export function deleteShow(deleteShow, team) {
    return {
        type: DELETE_SHOW,
        deleteShow: deleteShow,
        team: team
    }
}

/*********member相关*********/
export function getMembers(team) {
  return dispatch => {
    // dispatch(request())
    return fetch('/team/member',
      {
        body: {
          teamId: team.id
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

export function inviteMember(team, member) {
  return dispatch => {
    return fetch('/team/member/invited', {
      method: 'post',
      body: Object.assign({teamId: team.id}, member)
    })
      .then(json => dispatch({
        type: INVITE_MEMBER,
        member: json.data
      }))
  }
}

export function deleteMember(team, member) {
  return dispatch => {
    // dispatch(request())
    return fetch('/team/member', {
      method: 'delete',
      body: {
        username: member.username,
        teamId: team.id
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
