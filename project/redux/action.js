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

const me = pageConfig.me;

//获取文章，先触发requestPosts开始获取action，完成后触发receivePosts获取成功的action
export function getProjects() {
  return dispatch => {
    // dispatch(request())
    return fetch('/project/data', {
      body: {
        teamId: me.team
      }
    })
      .then(json => dispatch({
        type: GET,
        projects: json.data
      }))
  }
}

export function addShow(addShow) {
  return {
    type: ADD_SHOW,
    addShow: addShow
  }
}

export function addProject(project) {
  return dispatch => {
    return fetch('/project/data', {
      method: 'post',
      body: Object.assign({teamId: me.team}, project)
    })
      .then(json => dispatch({
        type: ADD,
        project: json.data
      }))
  }
}

export function updateShow(updateShow, project) {
  return {
    type: UPDATE_SHOW,
    updateShow: updateShow,
    project: project
  }
}

export function updateProject(project) {
  return dispatch => {
    // dispatch(request())
    return fetch('/project/data', {
      method: 'put',
      body: Object.assign({teamId: me.team}, project)
    })
      .then(json => dispatch({
        type: UPDATE,
        project: json.data
      }))
  }
}

export function deleteProject(project) {
  return dispatch => {
    // dispatch(request())
    return fetch('/project/data', {
      method: 'delete',
      body: {
        id: project.id,
        teamId: me.team
      }
    })
      .then(json => dispatch({
        type: DELETE,
        project: project
      }))
  }
}

export function deleteShow(deleteShow, project) {
  return {
    type: DELETE_SHOW,
    deleteShow: deleteShow,
    project: project
  }
}
