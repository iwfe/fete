/*
 * @Author: jade
 * @Date:   2016-06-12 00:03:50
 * @Last Modified by:   jade
 * @Last Modified time: 2016-06-16 11:58:14
 */

'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Card from 'antd/lib/card';

const Team = React.createClass({
    getInitialState() {
        return {
            team: {}
        }
    },
    handleTeam(type = 'add', team = {}) {
        return evt => {
            if (type == 'add') {
                //添加
            }
        }
    },

    render() {
        const state = this.state;
        const item = state.item;
        return (
            <Card title={item.name}>{item.description}</Card>
        )
    }
});