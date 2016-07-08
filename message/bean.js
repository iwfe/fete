/**
 * @Author: lancui
 * @Date:   2016-07-01 11:07:00
 * @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-07-08 10:07:17
 */


// 消息表
const message = {
  _id: '',
  id: '',
  userName: '',   // 操作人姓名
  msgType: '',   // 消息类型：系统(0)，提醒(1)
  platform: '',    // 平台类型(team, project, prd, api)
  platformId: '',   // 平台Id
  action: '', // 操作 (如：add, update, delete，invited)
  actionDetail: {}, // 操作描述
  createTime: '', // 创建时间
  toUsers: [{
    userId: '', // 提醒用户ID
    status: 0 // 0未读, 1已读
  }]
}

//邀请成员相关消息
const invited ={
  userName: '',   // 操作人姓名
  msgType: '0',   // 消息类型：系统(0)，提醒(1)
  platform: 'team',    // 平台类型(team, project, prd, api)
  platformId: 'xxx',   // 平台Id
  action: 'invited', // 操作 (如：add, update, delete)
  actionDetail: {
    team: {
      id:'xxx',
      name: 'xxx'
    }
  }, // 操作描述
  createTime: '', // 创建时间
  toUsers: [{
    userId: '', // 提醒用户ID
    status: 0 // 0未读, 1已读
  }]
}


// db.message.insert({userName: 'lancui', msgType: '1', platform: 'api', platformId: '576b401056e121e6c9ef082b',action: 'add', actionDetail: '新增消息接口', createTime: new Date})
