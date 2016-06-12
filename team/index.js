/*
 * @Author: jade
 * @Date:   2016-06-12 00:03:50
 * @Last Modified by:   jade
 * @Last Modified time: 2016-06-12 15:18:23
 */

'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    Router,
    Route,
    IndexRoute,
    Link,
    hashHistory
} from 'react-router';
import Button from 'antd/lib/button';

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
    render() {
        return (
            <div className="">home</div>
        )
    }
});

// const Item = React.createClass({});

// const Team = React.createClass({});
//<Route path=":id" component={Team} />
//<IndexRoute component={Index}/>
//<Route path="team/:id" component={Home} />
ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/team" component={Index}>
            <Route path="/" component={Home} />
        </Route>
    </Router>
), document.getElementById('main'));