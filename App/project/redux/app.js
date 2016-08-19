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
import Icon from 'antd/lib/icon';
import Card from 'antd/lib/card';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Project from '../components/Project';
import AddProject from '../components/AddProject';
import Nav from '../components/Nav';
import './app.scss';
const team = pageConfig.me.team;

class App extends Component {
    constructor(props) {
        super(props)
        // this.handleChange = this.handleChange.bind(this)
        // this.handleRefreshClick = this.handleRefreshClick.bind(this)
    }

    //初始化渲染后触发
    componentDidMount() {
        const { actions } = this.props
        actions.getProjects();
    }

    addOk(project) {
        const {actions} = this.props;
        actions.addProject(project);
    }

    addCancel() {
        const {actions} = this.props;
        actions.addShow(false);
    }

    render() {
        const self =  this;
        const { projects, actions, addShow, updateShow, deleteShow } = this.props;
        return (
            <div className="mod-project">
                <Nav team={team}/>
                <Row gutter={16}>
                    {
                        projects.map(item=>
                            <Col
                                key={'project-' + item.id}
                                className="gutter-row"
                                span={6}
                            >
                                <Project
                                    project={item}
                                    updateShow={(updateShow && updateShow.project.id === item.id) ? updateShow.updateShow : false}
                                    deleteShow={(deleteShow && deleteShow.project.id === item.id) ? deleteShow.deleteShow : false}
                                    actions={actions}
                                ></Project>
                            </Col>
                        )
                    }
                    <AddProject
                        visible={addShow}
                        type="add"
                        okCallback={this.addOk.bind(self)}
                        cancelCallback={this.addCancel.bind(self)}
                    />
                    <Col className="project-add gutter-row" span={6} onClick={() => actions.addShow(true)}>
                        <Card title="创建项目"><Icon type="plus" /></Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

App.propTypes = {
    projects: PropTypes.array.isRequired,
    addShow: PropTypes.bool,
    updateShow: PropTypes.object
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(state=>{
    return {
        projects:state.projects,
        addShow: state.addShow,
        confirmLoading: state.confirmLoading,
        updateShow: state.updateShow,
        deleteShow: state.deleteShow,
    }
}, mapDispatchToProps)(App);

/**
 *
 */
