/*
* @Author: jade
* @Date:   2016-05-24 23:35:15
* @Last Modified by:   jade
* @Last Modified time: 2016-06-05 23:32:22
*/

'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

var Index = React.createClass({
    getInitialState: function(){
        return {
            number: this.props.number,
            val: 0
        }
    },

    handleClick: function(){
        var self = this;
        self.setState({
            number: Math.random()
        });
    },

    componentWillMont: function() {
        console.log('wiimont');
    },

    componentDidMount: function() {
        return;
        console.log('add_listen');
        var self = this;

        self.setState({val: self.state.val + 1});
        console.log(self.state.val);

        self.setState({val: self.state.val + 1});
        console.log(self.state.val);

        setTimeout(function(){
            console.log(self.state.val);
            self.setState({val: self.state.val + 1});
            console.log(self.state.val);

            self.setState({val: self.state.val + 1});
            console.log(self.state.val);
        },0)
    },

    componentWillUnmout: function() {
        console.log('remove_listen');
    },

    render: function() {
        return (
            <div className="mod-index">
                <a href="/login">登录</a>
                <a href="/logout">退出</a>
            </div>
        )
    }
});

if(typeof document != 'undefined'){
    ReactDOM.render(<Index number={2}/>, document.getElementById('main'));    
}

export default Index;