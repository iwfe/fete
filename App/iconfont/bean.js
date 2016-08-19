/*
 * @Author: jade
 * @Date:   2016-06-06 17:04:44
 * @Last Modified by:   jade
 * @Last Modified time: 2016-06-16 10:30:16
 */

'use strict';
const iconfont = {
    _id: '',
    id: '', //自己生成的iconfontid
    name: '', //名称
    className: '', //className
    code: '', //code
    filePath: '', //存储路径
    teamId: '', //属于哪个团队,是主团队
    createUser: '', //创建人
    createTime: '', //创建时间
    updateTime: '' //更新时间
}

//iconfont team team,主从团队关系
const iconfontTeam = {
  _id: '',
  teamId: '',//主团队id
  childTeamId: '', //附属团队id
}

//iconfont中的iconfont,主要是附属团队
const teamIconfont = {
  _id: '',
  teamId: '', //team id
  iconfontId: '',//iconfont id
}
