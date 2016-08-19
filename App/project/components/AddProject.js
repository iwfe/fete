/*
 * @Author: jade
 * @Date:   2016-06-28 13:20:29
 * @Last Modified by:   jade
 * @Last Modified time: 2016-06-29 11:53:54
 */

'use strict';
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'antd/lib/modal';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Alert from 'antd/lib/alert';

const FormItem = Form.Item;

class AddProject extends Component {
    constructor(props, context) {
        super(props, context)
    }

    handleProject(type = 'add', project = {}) {
        return evt => {
            if (type == 'add') {
                //添加
            }
        }
    }

    componentDidMount() {
        const {project, form} = this.props;
        form.setFieldsValue({
            name: project && project.name,
            description: project && project.description
        });
    }

    handleOk() {
        const {form, okCallback, project} = this.props;
        const result = form.validateFields((errors, values) => {
            if (!!errors) {
                return false;
            } else {
                okCallback && okCallback(Object.assign({}, form.getFieldsValue(['name', 'description']), {
                    id: project && project.id
                }));
            }
        });
    }

    handleCancel() {
        const {cancelCallback} = this.props;
        cancelCallback && cancelCallback();
    }

    render() {
        const self = this;
        const {project, type, visible, form, error} = this.props;
        const {getFieldProps, setFieldsValue, isFieldValidating} = form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
        const nameProps = getFieldProps('name', {
            // value: project && project.name,
            rules: [
                {required: true, message: '请输入项目名称'}
            ]
        });

        const descriptionProps = getFieldProps('description', {
        });

        return (
            <Modal
                title={type == 'add' ? '新建项目' : '更新项目'}
                visible={visible}
                onOk={this.handleOk.bind(self)}
                onCancel={this.handleCancel.bind(self)}
            >
                <Form horizontal className="form" method="post" form={form}>
                    <FormItem
                        {...formItemLayout}
                        label="项目名称： ">
                        <Input
                            name="name"
                            autoFocus
                            {...nameProps}
                            defaultValue="1212"
                            placeholder="请输入项目名称"
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="项目描述： "
                        hasFeedback>
                        <Input
                            name="description"
                            {...descriptionProps}
                            type="textarea"
                            placeholder="请输入项目描述"/>
                    </FormItem>
                    {error ? <Alert message={error} type="error" showIcon/> : null}
                </Form>
            </Modal>
        )
    }
}

AddProject = Form.create()(AddProject);

export default AddProject;
