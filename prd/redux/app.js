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
import util from '../../common/util';
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
        </div>,
        width: 90
      }, {
        title: '版本号',
        dataIndex: 'name',
        key: 'name',
        width: 60,
      }, {
        title: '主要功能',
        dataIndex: 'description',
        key: 'description',
        width: 250,
      }, {
        title: '项目类型',
        dataIndex: 'type',
        key: 'type',
        width: 70,
      }, {
        title: '阶段',
        dataIndex: 'phase',
        key: 'phase',
        width: 55,
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
        width: 150,
        render: (text, prd) =>
          <a href={prd.jira} target="_blank">{prd.jira}</a>
      }, {
        title: '备注',
        dataIndex: 'comment',
        key: 'comment',
      }];
    prds.map(item=> {
      const {devTime, apiTime, testTime, onlineTime} = item;
      item.testTimeUI = testTime && util.formateDate(testTime, '%F');
      item.onlineTimeUI = onlineTime && util.formateDate(onlineTime, '%F');
      const now = Date.now();
      let phase = '未开始';
      if (now >= onlineTime) {
        phase = '已上线';
      } else if (now >= testTime) {
        phase = '测试';
      } else if (now >= apiTime) {
        phase = '联调';
      } else if (now >= devTime) {
        phase = '开发'
      }
      item.phase = phase;
    })

    return (
      <div className="mod-prd">
        <Nav team={team} project={project}/>
        <Button type="primary" style={{marginBottom: 16}} onClick={() => actions.addShow(true)}>创建PRD</Button>
        <Table dataSource={prds} columns={columns} useFixedHeader={true} rowKey={prd => prd.id}/>
        {
          addShow ? <AddPrd
            visible={addShow}
            type='add'
            okCallback={this.addOk.bind(self)}
            cancelCallback={this.addCancel.bind(self)}
          /> : null
        }
        {
          updateShow.updateShow ? <AddPrd
            visible={updateShow.updateShow}
            type='update'
            prd={updateShow.prd}
            okCallback={prd=>actions.updatePrd(prd)}
            cancelCallback={()=>actions.updateShow(false, updateShow.prd)}
          /> : null
        }
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
