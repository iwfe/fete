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
import AddPrd from '../components/AddPrd';
import PrdList from '../components/PrdList.jsx';
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


    return (
      <div className="mod-prd">
        <Nav team={team} project={project}/>
        <Button type="primary" style={{marginBottom: 16}} onClick={() => actions.addShow(true)}>创建PRD</Button>
        <PrdList prds={prds} actions={actions} />
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
