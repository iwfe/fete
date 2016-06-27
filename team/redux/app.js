/*
 * @Author: jade
 * @Date:   2016-06-26 21:57:58
 * @Last Modified by:   jade
 * @Last Modified time: 2016-06-27 23:27:39
 */

'use strict';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as action from './action'
import { getTeams, addTeam, updateTeam, deleteTeam } from './action';
// import {
//     Router,
//     Route,
//     IndexRoute,
//     Link,
//     browserHistory
// } from 'react-router';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Card from 'antd/lib/card';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
// import Team from './team';
import './app.scss';

class App extends Component {
    constructor(props) {
        super(props)
        // this.handleChange = this.handleChange.bind(this)
        // this.handleRefreshClick = this.handleRefreshClick.bind(this)
    }

    //初始化渲染后触发
    componentDidMount() {
        console.log('执行componentDidMount');
        const { dispatch } = this.props
        dispatch(getTeams())
    }

    //每次接受新的props触发
    componentWillReceiveProps(nextProps) {
        console.log('执行componentWillReceiveProps', nextProps);
        // if (nextProps.selectedReddit !== this.props.selectedReddit) {
        //     const { dispatch, selectedReddit } = nextProps
        //     dispatch(fetchPostsIfNeeded(selectedReddit))
        // }
    }

    handleChange(nextReddit) {
        // this.props.dispatch(selectReddit(nextReddit))
    }

    handleRefreshClick(e) {
        // e.preventDefault()

        // const { dispatch, selectedReddit } = this.props
        // dispatch(invalidateReddit(selectedReddit))
        // dispatch(fetchPostsIfNeeded(selectedReddit))
    }

    render() {
        const { teams } = this.props
        return (
            <div className="mod-team">
                <Row gutter={16}>
                    {
                        teams.map(item=>{
                            <Col key={'team-' + item._id} className="gutter-row" span={6}>
                                <Team team={item}></Team>
                            </Col>
                        })
                    }
                    <Col className="team-add gutter-row" span={6} onClick={this.handleTeam}>
                        <Card title="创建团队"><Icon type="plus" /></Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

App.propTypes = {
    teams: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
}

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(TodoActions, dispatch)
//   }
// }

// connect(mapStateToProps, mapDispatchToProps)(Counter)

export default connect(()=>{
    return {
        teams:[]
    }
})(App);

/**
 * 
 */