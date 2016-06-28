/*
* @Author: jade
* @Date:   2016-06-28 13:20:29
* @Last Modified by:   jade
* @Last Modified time: 2016-06-28 13:20:37
*/

'use strict';
import React, { Component, PropTypes } from 'react';
import Modal from 'antd/lib/modal';

export default class AddTeam extends Component {
    constructor(props, context) {
        super(props, context)
    }

    handleTeam(type = 'add',team = {}) {
        return evt => {
            if (type == 'add') {
                //添加
            }
        }
    }

    handleOk() {

    }

    render() {
        const {team, type, visible, confirmLoading} = this.props;
        console.log(`add:${visible}`)
        return (
            <Modal
                   title={type == 'add' ? '新建团队' : '更新团队'}
                   visible={visible}
                   onOk={this.handleOk}
                   confirmLoading={confirmLoading}
                   onCancel={this.handleCancel}
            >

            </Modal>
        )
    }
}