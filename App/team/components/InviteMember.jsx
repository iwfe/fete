/*
 * @Author: jade
 * @Date:   2016-06-28 13:20:29
 * @Last Modified by:   jade
 * @Last Modified time: 2016-06-29 11:53:54
 */

'use strict';
import React, {Component, PropTypes} from 'react';
import Modal from 'antd/lib/modal';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';

const FormItem = Form.Item;

class InviteMember extends Component {
  constructor(props, context) {
    super(props, context)
  }

  handleOk() {
    const {form, okCallback, team} = this.props;
    const result = form.validateFields((errors, values) => {
      if (!!errors) {
        return false;
      } else {
        okCallback && okCallback(Object.assign({}, form.getFieldsValue(['username'])));
      }
    });
  }

  handleCancel() {
    const {cancelCallback} = this.props;
    cancelCallback && cancelCallback();
  }

  render() {
    const self = this;
    const {visible, form} = this.props;
    const {getFieldProps, getFieldError, isFieldValidating} = form;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };
    const usernameProps = getFieldProps('username', {
      // value: team && team.name,
      rules: [
        {required: true, message: '请输入用户名'},
        {
          validator: (rule, value, callback) => {
            if (!value) {
              callback();
            } else {
              fetch('/user/data', {
                body: {
                  username: value
                }
              }).then(res => {
                callback();
              }).catch(err => {
                callback(err.response.message);
              })
            }
          }
        }
      ]
    });

    return (
      <Modal
        title="邀请成员"
        visible={visible}
        onOk={this.handleOk.bind(self)}
        onCancel={this.handleCancel.bind(self)}
      >
        <Form horizontal className="form" method="post" form={form}>
          <FormItem
            {...formItemLayout}
            label="用户名： "
            hasFeedback
            help={isFieldValidating('username') ? '校验中...' : (getFieldError('username') || []).join(', ')}
          >
            <Input
              name="username"
              autoFocus
              {...usernameProps}
              placeholder="请输入用户名"
            />
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

InviteMember = Form.create()(InviteMember);

export default InviteMember;
