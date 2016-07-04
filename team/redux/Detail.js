/*
 * @Author: jade
 * @Date:   2016-06-26 21:57:58
 * @Last Modified by:   jade
 * @Last Modified time: 2016-06-29 11:58:51
 */

'use strict';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as actions from './action'
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Card from 'antd/lib/card';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Team from '../components/Team';
import AddTeam from '../components/AddTeam';
import './app.scss';

class Detail extends Component {
  constructor(props) {
    super(props)
  }

  //初始化渲染后触发
  componentDidMount() {
    const { actions } = this.props
    actions.getTeams();
  }

  render() {
    const self =  this;
    const { teams, actions, addShow, updateShow, deleteShow } = this.props;
    return (
      <div className="mod-detail">
        <h2>团队成员</h2>

      </div>
    )
  }
}

Detail.propTypes = {
  teamId: PropTypes.string.isRequired,
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(state=>{
  return {
    teamId: state.teamId,
  }
}, mapDispatchToProps)(Detail);
