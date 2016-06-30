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

//获取文章，先触发requestPosts开始获取action，完成后触发receivePosts获取成功的action
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
