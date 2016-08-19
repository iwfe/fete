/**
* @Author: geyuanjun
* @Date:   2016-07-11 17:42:28
* @Email:  geyuanjun.sh@superjia.com
* @Last modified by:   geyuanjun
* @Last modified time: 2016-07-12 10:54:0
*/
export const list = state => state.list
export const listActive = state => state.list_active
export const userId = state => state.userId
export const prdId = state => state.prdId
export const projectId = state => state.projectId
export const teamId = state => state.teamId
export const listIndex = state => state.list.indexOf(state.list_active)
export const apiRoot = state => state.apiRoot
export const prdList = state => state.prdList
