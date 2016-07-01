/**
* @Author: lancui
* @Date:   2016-07-01 11:07:00
* @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-07-01 18:07:03
*/


// 消息表
const message = {
	_id: '',
  id: '',
  userId: '',  // 操作人Id
	userName: '',   // 操作人姓名
	operation: '', // 操作
	desc: '',       // 描述
	createTime: '', // 创建时间
  apiId: '',   // apiId
  toUsers: [] // 提醒的用户Id
}

const userMessage = {
  _id: '',
  msgId: '', // 消息ID
  userId: '', // 提醒用户ID
  status: 0 // 0未读, 1已读
}
// db.message.insert({userId:'575d123b8ec94fadd78437e9', userName:'jade', operation:'add', desc:'新增消息接口', createTime:'2016-06-23', apiId:'576b401056e121e6c9ef082b', status: 0, toUsers: ['575e7bcbddd400c4adf4fcd0','576b4f9856e121e6c9ef0830']})
// db.message.insert({userId:'575d123b8ec94fadd78437e9', userName:'jade', operation:'update', desc:'修改消息接口33', createTime:'2016-06-24', apiId:'576b401056e121e6c9ef082b', status: 1, toUsers: ['575e7bcbddd400c4adf4fcd0','576b4f9856e121e6c9ef0830']})
