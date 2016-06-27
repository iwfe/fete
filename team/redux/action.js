/*
 * @Author: jade
 * @Date:   2016-06-26 21:49:54
 * @Last Modified by:   jade
 * @Last Modified time: 2016-06-27 18:55:04
 */

'use strict';

// export const REQUEST = 'REQUEST';
export const RECEIVE = 'RECEIVE';
export const ADD = 'ADD';
export const UPDATE = 'UPDATE';

// export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

// export function selectReddit(reddit) {
//     return {
//         type: SELECT_REDDIT,
//         reddit
//     }
// }
// //废弃新闻类型action
// export function invalidateReddit(reddit) {
//     return {
//         type: INVALIDATE_REDDIT,
//         reddit
//     }
// }
//开始获取team action
// function request() {
//     return {
//         type: REQUEST
//     }
// }
//获取新闻成功的action
// function receive(json) {
//     return {
//         type: RECEIVE,
//         teams: json.data.map(child => child.data)
//     }
// }

//获取文章，先触发requestPosts开始获取action，完成后触发receivePosts获取成功的action
export function getTeams() {
    return dispatch => {
        // dispatch(request())
        return fetch('/team')
            .then(json => dispatch({
                    type: RECEIVE,
                    teams: json.data.map(child => child.data)
                });
            }
    }

    //是否需要获取文章
    // function shouldFetchPosts(state, reddit) {
    //     const posts = state.postsByReddit[reddit]
    //     if (!posts) {
    //         return true
    //     }
    //     if (posts.isFetching) {
    //         return false
    //     }
    //     return posts.didInvalidate
    // }

    //如果需要则开始获取文章
    // export function fetchPostsIfNeeded(reddit) {
    //     return (dispatch, getState) => {
    //         if (shouldFetchPosts(getState(), reddit)) {
    //             return dispatch(fetchPosts(reddit))
    //         }
    //     }
    // }
