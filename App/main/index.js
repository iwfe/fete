/*
* @Author: jade
* @Date:   2016-05-24 23:35:15
* @Last modified by:   lancui
* @Last modified time: 2016-07-20 11:07:27
*/

'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

var Index = React.createClass({
    getInitialState: function(){
        return {
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
                很遗憾让你看到这么丑的首页,请点击上面的团队开始使用吧^_^。
            </div>
        )
    }
});

if(typeof document != 'undefined'){
    ReactDOM.render(<Index/>, document.getElementById('main'));
}

export default Index;
