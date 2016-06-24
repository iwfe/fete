/**
* @Author: lancui
* @Date:   2016-06-23 17:06:00
* @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-06-23 19:06:70
*/



'use strict';

const api = {
	_id: '',
	userId:'', // 操作用户ID
	userName:'', // 操作用户名
    title:'', // 标题
    url:'', // 请求url
    method:'', //提交方式 (get post)
    input:'', // 入参
    output: [ // 出参
		{
			key: 'status', // 属性名
			dataType: 'Integer', // 属性类型 （Integer,Float, String, Boolean, Array，Object）
			comment: '状态', // 说明
			mock: '', // mock规则
            children: [ // 子元素 （可选，只有dataType是Array，Object才会有）
                {
					key: 'type',
					dataType: 'Integer',
					comment: '',
					mock: ''
				}
            ]
		}
	],
	status: 1,	// 1 新建， 2 修改  3 已废弃
	updateDescList: [{ // 修改说明list
		updateTime: '', // 更新时间
		userName:'', // 用户名
		updateDesc: '' // 更新说明
	}],
	prdId: '', // PrdID
	productId: '', // 项目Id
	teamId: '', // 项目组Id
	updateTime:'', // 更新时间
	createTime:'' // 创建时间
}

const message = {
    userId:'',  //操作人Id
	userName:'',   // 操作人姓名
	operation: '', // 操作
	desc:'',       // 描述
	createTime: '', // 创建时间
    apiId:'',   // apiId
    status: '', //1已读，0未读
    toUsers: [] // 提醒的用户Id
}
// db.message.insert({userId:'575d123b8ec94fadd78437e9', userName:'jade', operation:'add', desc:'新增消息接口', createTime:'2016-06-23', apiId:'576b401056e121e6c9ef082b', status: 0, toUsers: ['575e7bcbddd400c4adf4fcd0','576b4f9856e121e6c9ef0830']})
