/**
 * @Author: lancui
 * @Date:   2016-06-23 17:06:00
 * @Email:  lancui@superjia.com
* @Last modified by:   geyuanjun
* @Last modified time: 2016-07-15 18:29:52
 */

'use strict';
/*
  input和outputJson是编辑框里的真实输入值，皆为json对象
  inputModel和ouput是通过json转换后的数组对象
 */
const api = {
  _id: '',
  id: '',
  userId: '', // 操作用户ID
  userName: '', // 操作用户名
  title: '', // 标题
  url: '', // 请求url
  method: '', //提交方式 (get post)
  input:{},
  inputModel: [
    {
      key: '',
      dataType: '',
      comment: '',
      require: true,
      children: []
    }
  ], // 入参
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
  outputJson: {}, //保存outputJson格式
  useOutputJson: false, // 使用 outputJson 还是 使用 mock
  status: 1, // 1 新建， 2 修改
  updateDescList: [{ // 修改说明list
    updateTime: '', // 更新时间
    userName: '', // 用户名
    updateDesc: '' // 更新说明
  }],
  prdId: '', // PrdID
  projectId: '', // 项目Id
  root: '', // 如 weixinEnt
  teamId: '', // 项目组Id
  updateTime: '', // 更新时间
  createTime: '', // 创建时间
  categories: [], // 已有的分类
  newCategory: '' // 新创建的分类
}
