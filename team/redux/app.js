/*
 * @Author: jade
 * @Date:   2016-06-26 21:57:58
 * @Last Modified by:   jade
 * @Last Modified time: 2016-06-26 22:14:39
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



import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectReddit, fetchPostsIfNeeded, invalidateReddit } from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class App extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleRefreshClick = this.handleRefreshClick.bind(this)
    }

    //初始化渲染后触发
    componentDidMount() {
        console.log('执行componentDidMount');
        const { dispatch, selectedReddit } = this.props
        dispatch(fetchPostsIfNeeded(selectedReddit))
    }

    //每次接受新的props触发
    componentWillReceiveProps(nextProps) {
        console.log('执行componentWillReceiveProps', nextProps);
        if (nextProps.selectedReddit !== this.props.selectedReddit) {
            const { dispatch, selectedReddit } = nextProps
            dispatch(fetchPostsIfNeeded(selectedReddit))
        }
    }

    handleChange(nextReddit) {
        this.props.dispatch(selectReddit(nextReddit))
    }

    handleRefreshClick(e) {
        e.preventDefault()

        const { dispatch, selectedReddit } = this.props
        dispatch(invalidateReddit(selectedReddit))
        dispatch(fetchPostsIfNeeded(selectedReddit))
    }

    render() {
        const { selectedReddit, posts, isFetching, lastUpdated } = this.props
        return (
          <div>
            <Picker value={selectedReddit}
                    onChange={this.handleChange}
                    options={[ 'reactjs', 'frontend' ]} />
            <p>
                {lastUpdated &&
                    <span>
                        Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                        {' '}
                    </span>
                }
                {!isFetching &&
                    <a href="#"
                        onClick={this.handleRefreshClick}>
                        Refresh
                    </a>
                }
            </p>
            {isFetching && posts.length === 0 &&
              <h2>Loading...</h2>
            }
            {!isFetching && posts.length === 0 &&
              <h2>Empty.</h2>
            }
            {posts.length > 0 &&
              <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                <Posts posts={posts} />
              </div>
            }
          </div>
        )
    }
}

App.propTypes = {
    selectedReddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { selectedReddit, postsByReddit } = state
    const {
        isFetching,
        lastUpdated,
        items: posts
    } = postsByReddit[selectedReddit] || {
        isFetching: true,
        items: []
    }

    return {
        selectedReddit,
        posts,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(App)
