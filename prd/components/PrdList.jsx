'use strict';
import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import {Link} from 'react-router';
import Table from 'antd/lib/table';
import util from '../../common/util';

export default class PrdList extends Component {
  constructor(props, context) {
    super(props, context);
  };

  static propTypes = {
    prds: PropTypes.array.isRequired,
  };

  static defaultProps = {
    prds: []
  };

  render() {
    const {prds, actions} = this.props;
    const columns = [
      {
        title: '操作',
        dataIndex: '',
        key: 'opts', render: (text, prd) =>
        <div>
          <a href={"/api?prdId=" + prd.id}>api</a>&nbsp;
          <a href={"/prd/" + prd.id}>详情</a>&nbsp;
          <a onClick={() => actions.updateShow(true, prd)}>更新</a>&nbsp;
          <a style={{color: 'red'}} onClick={() => actions.deleteShow(true, prd)}>删除</a>
        </div>,
        width: 120
      }, {
        title: '版本号',
        dataIndex: 'name',
        key: 'name',
        width: 60,
      }, {
        title: '主要功能',
        dataIndex: 'description',
        key: 'description',
        width: 150,
      }, {
        title: '项目类型',
        dataIndex: 'type',
        key: 'type',
        width: 70,
      }, {
        title: '阶段',
        dataIndex: 'phase',
        key: 'phase',
        width: 65,
      }, {
        title: '提测时间',
        dataIndex: 'testTimeUI',
        key: 'testTimeUI',
        width: 80,
      }, {
        title: '上线时间',
        dataIndex: 'onlineTimeUI',
        key: 'onlineTimeUI',
        width: 80,
      }, {
        title: '产品',
        dataIndex: 'pm',
        key: 'pm',
        width: 100,
      }, {
        title: '自测',
        dataIndex: 'selfTest',
        key: 'selfTest',
        width: 40,
      }, {
        title: 'JIRA地址',
        dataIndex: 'jira',
        key: 'jira',
        width: 100,
        render: (text, prd) =>
          <a href={prd.jira} target="_blank">{prd.jira}</a>
      }, {
        title: 'svn地址',
        dataIndex: 'svn',
        key: 'svn',
        width: 150,
        render: (text, prd) =>
          <a href={prd.svn} target="_blank">{prd.svn}</a>
      }, {
        title: '备注',
        dataIndex: 'comment',
        key: 'comment',
      }];
    if(!actions) {
      columns.splice(0,1)
    }
    prds.map(item=> {
      const {mrdTime, prdTime, devTime, apiTime, testTime, betaTime, onlineTime} = item;
      item.testTimeUI = testTime && util.formateDate(testTime, '%F');
      item.onlineTimeUI = onlineTime && util.formateDate(onlineTime, '%F');
      const now = Date.now();
      let phase = '未开始';
      if (now >= onlineTime) {
        phase = '已上线';
      } else if (now >= betaTime) {
        phase = 'beta测试';
      } else if (now >= testTime) {
        phase = 'test测试';
      } else if (now >= apiTime) {
        phase = '联调';
      } else if (now >= devTime) {
        phase = '开发'
      } else if (now >= prdTime) {
        phase = 'prd阶段'
      } else if (now >= mrdTime) {
        phase = 'mrd阶段'
      }
      item.phase = phase;
    })
    return (
      <Table dataSource={prds} columns={columns} useFixedHeader={true} rowKey={prd => prd.id}/>
    )
  }
}
