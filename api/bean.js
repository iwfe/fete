/**
* @Author: lancui
* @Date:   2016-06-23 17:06:00
* @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-07-05 15:07:59
*/



'use strict';

const api = {
	_id: '',
	id: '',
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
	// outputMock:{}, //保存生成的mock格式  // 不要这个字段了
	status: 1,	// 1 新建， 2 修改
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
