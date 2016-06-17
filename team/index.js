/*
 * @Author: jade
 * @Date:   2016-06-12 00:03:50
 * @Last Modified by:   jade
 * @Last Modified time: 2016-06-16 17:38:12
 */

'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    Router,
    Route,
    IndexRoute,
    Link,
    browserHistory
} from 'react-router';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Card from 'antd/lib/card';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Team from './team';
import './index.scss';

const Index = React.createClass({
    render() {
        return (
            <div >
                <h1>我的团队</h1>
                {this.props.children}
            </div>
        )
    }
});

const Home = React.createClass({
    getInitialState() {
        return {
            teams: []
        }
    },
    componentDidMount() {
        const self = this;
        fetch('/team/list').then(res => {
            self.setState({
                teams: res.data
            });
        });
    },

    handleTeam() {
        let teams = this.state.teams;
        teams.push({
            opt: 'add'
        });
        this.setState({
            teams: teams
        });
    },

    render() {
        const state = this.state;
        return (
            <div className="mod-team">
                <Row gutter={16}>
                    {
                        state.teams.map(item=>{
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
});

// const Item = React.createClass({});

// const Team = React.createClass({});
//<Route path=":id" component={Team} />
//<IndexRoute component={Index}/>
//<Route path="team/:id" component={Home} />
ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/team" component={Index}>
            <IndexRoute component={Home}/>
            <Route path=":id" component={Home} />
        </Route>
    </Router>
), document.getElementById('main'));