/*
 * @Author: jade
 * @Date:   2016-06-12 00:03:50
 * @Last Modified by:   jade
 * @Last Modified time: 2016-06-28 23:37:31
 */

'use strict';
import React, {Component, PropTypes} from 'react';
import Card from 'antd/lib/card';
import AddTeam from './AddTeam';

export default class Team extends Component {
    constructor(props, context) {
        super(props, context);
    }

    handleTeam(type = 'add', team = {}) {
        return evt => {
            if (type == 'add') {
                //添加
            }
        }
    }

    render() {
        const {team, updateShow} = this.props;
        return (
            <div>
                <Card title={team.name}>{team.description}</Card>
                <AddTeam visible={updateShow} team={team} type="update" />
            </div>
        )
    }
}

Team.propTypes = {}