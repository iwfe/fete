/*
 * @Author: jade
 * @Date:   2016-05-24 23:35:15
 * @Last Modified by:   jade
 * @Last Modified time: 2016-06-06 15:20:58
 */

'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Alert from 'antd/lib/Alert';

const FormItem = Form.Item;

let Login = React.createClass ({
    getInitialState: function(){
        return {
            error: this.props.error
        }
    },
    componentDidMount() {
        this.props.form.setFieldsValue({
            username: this.props.username
        });
    },
    handleChange(date) {
        // this.setState({ date });
    },
    handleSubmit(e){
        const form = this.props.form;
        
        const result = form.validateFields((errors, values) => {
            if (!!errors) {
                e.preventDefault();
                return false;
            }
            
        });
        console.log(result);
    },
    handleKeyPress() {
        this.state.error = '';
    },
    render() {
        const form = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { getFieldProps, getFieldError, isFieldValidating } = form;
        const usernameProps = getFieldProps('username', {
            rules: [
                { required: true, message: '请输入用户名' }
            ]
        });

        const passwordProps = getFieldProps('password', {
            rules: [
                { required: true, message: '请输入密码' }
            ]
        });
        return (
            <div className = "mod-login">
                <h1 className="title">登录</h1>
                <Form horizontal className="form" method="post" form={this.props.form} onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="用户名/邮箱： ">
                        <Input 
                            name="username" 
                            autoFocus {...usernameProps} 
                            placeholder="请输入用户名" 
                            onKeyPress={this.handleKeyPress} />    
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="密码： "
                        hasFeedback>
                        <Input name="password" {...passwordProps} type="password" placeholder="请输入密码"/>    
                    </FormItem>
                    {this.state.error ? <Alert message={this.state.error} type="error" showIcon/> : ''}
                    <FormItem
                        wrapperCol = {{span: 16, offset: 6}} style={{marginTop: 24}}
                    >
                        <Button type="primary" htmlType="submit">登录</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
})

Login = Form.create()(Login);

if (typeof document != 'undefined') {
    ReactDOM.render(
        <Login username={pageConfig.login.username} error={pageConfig.login.error} />, document.getElementById('main')
    );    
}

export default Login;
