/*
 * @Author: jade
 * @Date:   2016-06-26 21:57:58
 * @Last Modified by:   jade
 * @Last Modified time: 2016-06-29 11:58:51
 */

'use strict';
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as actions from './Actions'
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import AddPrd from '../components/AddPrd';
import Nav from '../components/Nav';
import './app.scss';
const {team, project} = pageConfig.me;

class App extends Component {
  constructor(props) {
    super(props)
    // this.handleChange = this.handleChange.bind(this)
    // this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  //初始化渲染后触发
  componentDidMount() {
    const {actions} = this.props
    actions.getPrds();
  }

  addOk(prd) {
    const {actions} = this.props;
    actions.addPrd(prd);
  }

  addCancel() {
    const {actions} = this.props;
    actions.addShow(false);
  }

  render() {
    const self = this;
    const {prds, actions, addShow, updateShow, deleteShow} = this.props;
    const columns = [
      {
        title: '操作',
        dataIndex: '',
        key: 'opts', render: (text, prd) =>
          <div>
            <a href={"/api?prdId=" + prd.id}>api</a>&nbsp;
            <a onClick={() => actions.updateShow(true, prd)}>更新</a>&nbsp;
            <a style={{color: 'red'}} onClick={() => actions.deleteShow(true, prd)}>删除</a>
          </div>
      }, {
        title: '版本号',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '主要功能',
        dataIndex: 'description',
        key: 'description',
      }, {
        title: '项目类型',
        dataIndex: 'type',
        key: 'type',
      }, {
        title: '阶段',
        dataIndex: 'type1',
        key: 'type1',
      }, {
        title: '提测时间',
        dataIndex: 'testTime',
        key: 'testTime',
      }, {
        title: '上线时间',
        dataIndex: 'onlineTime',
        key: 'onlineTime',
      }, {
        title: '产品',
        dataIndex: 'pm',
        key: 'pm',
      }, {
        title: '自测',
        dataIndex: 'selfTest',
        key: 'selfTest',
      }, {
        title: 'JIRA地址',
        dataIndex: 'jira',
        key: 'jira',
      }, {
        title: '备注',
        dataIndex: 'comment',
        key: 'comment',
      }];
    return (
      <div className="mod-prd">
        <Nav team={team} project={project}/>
        <Button type="primary" onClick={() => actions.addShow(true)}>创建PRD</Button>
        <Table dataSource={prds} columns={columns}/>
        <AddPrd
          visible={addShow}
          type="add"
          okCallback={this.addOk.bind(self)}
          cancelCallback={this.addCancel.bind(self)}
        />
        <Modal title="删除PRD"
               visible={deleteShow.deleteShow}
               onCancel={() => actions.deleteShow(false, deleteShow.prd)}
               onOk={() => actions.deletePrd(deleteShow.prd)}
        >
          <p>您确定要删除该"{deleteShow.prd.name}"prd吗?</p>
        </Modal>
      </div>
    )
  }
}

App.propTypes = {
  prds: PropTypes.array.isRequired,
  addShow: PropTypes.bool,
  updateShow: PropTypes.object
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(state=> {
  return {
    prds: state.prds,
    addShow: state.addShow,
    confirmLoading: state.confirmLoading,
    updateShow: state.updateShow,
    deleteShow: state.deleteShow,
  }
}, mapDispatchToProps)(App);

/**
 *
 */
