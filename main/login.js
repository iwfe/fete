/*
 * @Author: jade
 * @Date:   2016-05-24 23:35:15
 * @Last Modified by:   jade
 * @Last Modified time: 2016-06-01 19:30:36
 */

'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Col from 'antd/lib/col';

const FormItem = Form.Item;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
        };
    }
    handleChange(date) {
        this.setState({ date });
    }
    handleSubmit(e){
        let username = 
    }
    render() {
        const form = this.props.form;
        const { getFieldProps } = form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
        const nameProps = getFieldProps('name', {
          rules: [
            { required: true, min: 5, message: '用户名至少为 5 个字符' },
            { validator: this.userExists },
          ],
        });
        return (
            <div className = "mod-login">
                <h1 className="title">登录</h1>
                <Form horizontal className="form" onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="用户名/邮箱： "
                    >
                        <Input placeholder="请输入用户名" id="username" {...getFieldProps('userName')}/>    
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="密码： "
                    >
                        <Input placeholder="请输入密码" id="password" {...getFieldProps('password')}/>    
                    </FormItem>
                    <FormItem
                        wrapperCol = {{span: 16, offset: 6}} style={{marginTop: 24}}
                    >
                        <Button type="primary" htmlType="submit">登录</Button>    
                    </FormItem>
                </Form>
            </div>
        );
    }
}

Login = Form.create()(Login);

if (typeof document != 'undefined') {
    ReactDOM.render( 
        <Login number = { 2 }/>, document.getElementById('main')
    );    
}

export default Login;
