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

const {team, project} = pageConfig.me;

//获取文章，先触发requestPosts开始获取action，完成后触发receivePosts获取成功的action
export function getPrds() {
  return dispatch => {
    // dispatch(request())
    return fetch('/prd/data', {
      body: {
        projectId: project.id
      }
    })
      .then(json => dispatch({
        type: GET,
        prds: json.data
      }))
  }
}

export function addShow(addShow) {
  return {
    type: ADD_SHOW,
    addShow: addShow
  }
}

export function addPrd(prd) {
  return dispatch => {
    return fetch('/prd/data', {
      method: 'post',
      body: Object.assign({projectId: project.id}, prd)
    })
      .then(json => dispatch({
        type: ADD,
        prd: json.data
      }))
  }
}

export function updateShow(updateShow, prd) {
  return {
    type: UPDATE_SHOW,
    updateShow: updateShow,
    prd: prd
  }
}

export function updatePrd(prd) {
  return dispatch => {
    // dispatch(request())
    return fetch('/prd/data', {
      method: 'put',
      body: Object.assign({projectId: project.id}, prd)
    })
      .then(json => dispatch({
        type: UPDATE,
        prd: json.data
      }))
  }
}

export function deletePrd(prd) {
  return dispatch => {
    // dispatch(request())
    return fetch('/prd/data', {
      method: 'delete',
      body: {
        id: prd.id,
        projectId: project.id
      }
    })
      .then(json => dispatch({
        type: DELETE,
        prd: prd
      }))
  }
}

export function deleteShow(deleteShow, prd) {
  return {
    type: DELETE_SHOW,
    deleteShow: deleteShow,
    prd: prd
  }
}
