/*
 * @Author: jade
 * @Date:   2016-06-28 13:20:29
 * @Last Modified by:   jade
 * @Last Modified time: 2016-06-29 11:53:54
 */

'use strict';
import React, {Component, PropTypes} from 'react'
import Modal from 'antd/lib/modal'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Radio from 'antd/lib/radio'
import DatePicker from 'antd/lib/date-picker'
const RadioGroup = Radio.Group
const FormItem = Form.Item
class AddPrd extends Component {
  constructor(props, context) {
    super(props, context)
  }
  handlePrd(type = 'add', prd = {}) {
    return evt => {
      if (type == 'add') {
        //添加
      }
    }
  }
  handleOk() {
    const {form, okCallback, prd} = this.props;
    const result = form.validateFields((errors, values) => {
      if (!!errors) {
        return false;
      } else {
        let obj = Object.assign({},
          form.getFieldsValue([
            'name',
            'description',
            'pm',
            'type',
            'selfTest',
            'jira',
            'svn',
            'comment',
            'mrdTime',
            'prdTime',
            'devTime',
            'apiTime',
            'testTime',
            'betaTime',
            'onlineTime'
          ]),
          {
            id: prd && prd.id
          });
        obj.mrdTime = new Date(obj.mrdTime).getTime();
        obj.prdTime = new Date(obj.prdTime).getTime();
        obj.devTime = new Date(obj.devTime).getTime();
        obj.apiTime = new Date(obj.apiTime).getTime();
        obj.testTime = new Date(obj.testTime).getTime();
        obj.betaTime = new Date(obj.betaTime).getTime();
        obj.onlineTime = new Date(obj.onlineTime).getTime();
        okCallback && okCallback(obj);
      }
    });
  }
  handleCancel() {
    const {cancelCallback} = this.props;
    cancelCallback && cancelCallback();
  }
  render() {
    const self = this;
    const {prd, type, visible, form, error} = this.props;
    const {getFieldProps, setFieldsValue, isFieldValidating} = form;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };
    const nameProps = getFieldProps('name', {
      // value: prd && prd.name,
      rules: [
        {required: true, message: '请输入PRD名称'}
      ],
      id: 'name',
      initialValue: prd && prd.name
    })

    const descriptionProps = getFieldProps('description', {
      initialValue: prd && prd.description
    })
    const pmProps = getFieldProps('pm', {
      initialValue: prd && prd.pm
    })
    const typeProps = getFieldProps('type', {
      initialValue: prd && prd.type
    })
    const selfTestProps = getFieldProps('selfTest', {
      initialValue: prd && prd.selfTest
    })
    const jiraProps = getFieldProps('jira', {
      initialValue: prd && prd.jira
    })
    const svnProps = getFieldProps('svn', {
      initialValue: prd && prd.svn
    })
    const commentProps = getFieldProps('comment', {
      initialValue: prd && prd.comment
    })
    const mrdTimeProps = getFieldProps('mrdTime', {
      getValueFromEvent: (value, timeString) => timeString,
      initialValue: prd && prd.mrdTime ? new Date(prd.mrdTime) : new Date()
    })
    const prdTimeProps = getFieldProps('prdTime', {
      getValueFromEvent: (value, timeString) => timeString,
      initialValue: prd && prd.prdTime ? new Date(prd.prdTime) : new Date()
    })
    const devTimeProps = getFieldProps('devTime', {
      getValueFromEvent: (value, timeString) => timeString,
      initialValue: prd && prd.devTime ? new Date(prd.devTime) : new Date()
    })
    const apiTimeProps = getFieldProps('apiTime', {
      getValueFromEvent: (value, timeString) => timeString,
      initialValue: prd && prd.apiTime? new Date(prd.apiTime) : new Date()
    })
    const testTimeProps = getFieldProps('testTime', {
      getValueFromEvent: (value, timeString) => timeString,
      initialValue: prd && prd.testTime ? new Date(prd.testTime) : new Date()
    })
    const betaTimeProps = getFieldProps('betaTime', {
      getValueFromEvent: (value, timeString) => timeString,
      initialValue: prd && prd.betaTime ? new Date(prd.betaTime) : new Date()
    })
    const onlineTimeProps = getFieldProps('onlineTime', {
      getValueFromEvent: (value, timeString) => timeString,
      initialValue: prd && prd.onlineTime ? new Date(prd.onlineTime) : new Date()
    })
    return (
      <Modal
        title={type == 'add' ? '新建PRD' : '更新PRD'}
        visible={visible}
        onOk={this.handleOk.bind(self)}
        onCancel={this.handleCancel.bind(self)}
        style={{ top: 30 }}
      >
        <Form horizontal className="form" method="post" form={form}>
          <FormItem
            {...formItemLayout}
            label="名称： ">
            <Input
              name="name"
              autoFocus
              {...nameProps}
              placeholder="请输入PRD名称"
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="主要功能： "
            hasFeedback>
            <Input
              name="description"
              {...descriptionProps}
              type="textarea"
              placeholder="请输入PRD主要功能"/>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="项目类型： ">
            <Input
              name="type"
              {...typeProps}
              placeholder="小版本/常规需求/技术优化/功能BUG修复"
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="产品： ">
            <Input
              name="pm"
              {...pmProps}
              placeholder="请输入PRD产品经理"
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="是否自测： ">
            <RadioGroup {...selfTestProps}>
              <Radio value="是">是</Radio>
              <Radio value="否">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="JIRA地址： ">
            <Input
              name="jira"
              {...jiraProps}
              placeholder="请输入JIRA地址"
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="SVN地址： ">
            <Input
              name="svn"
              {...svnProps}
              placeholder="请输入SVN地址"
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="mrd时间： ">
            <DatePicker {...mrdTimeProps} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="prd时间： ">
            <DatePicker {...prdTimeProps} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="开发时间： ">
            <DatePicker {...devTimeProps} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="联调时间： ">
            <DatePicker {...apiTimeProps} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="提测时间： ">
            <DatePicker {...testTimeProps} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="beta测试： ">
            <DatePicker {...betaTimeProps} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="上线时间： ">
            <DatePicker {...onlineTimeProps} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="备注： "
            hasFeedback>
            <Input
              name="comment"
              {...commentProps}
              type="textarea"
              placeholder="请输入PRD备注"/>
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

AddPrd = Form.create()(AddPrd);

export default AddPrd;
