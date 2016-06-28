/*
 * @Author: jade
 * @Date:   2016-06-12 00:03:50
 * @Last Modified by:   jade
 * @Last Modified time: 2016-06-28 23:37:31
 */

'use strict';
import React, {Component, PropTypes} from 'react';
import Card from 'antd/lib/card';

export default class Team extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            editing: false
        }
    }

    handleTeam(type = 'add', team = {}) {
        return evt => {
            if (type == 'add') {
                //添加
            }
        }
    }

    render() {
        const state = this.state;
        const item = state.item;
        return (
            <Card title={item.name}>{item.description}</Card>
        )
    }
}

Team.propTypes = {}