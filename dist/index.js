webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*
	* @Author: jade
	* @Date:   2016-05-24 23:35:15
	* @Last Modified by:   jade
	* @Last Modified time: 2016-05-31 10:59:46
	*/
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(38);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Index = _react2.default.createClass({
	    displayName: 'Index',
	
	    getInitialState: function getInitialState() {
	        return {
	            number: this.props.number,
	            val: 0
	        };
	    },
	
	    handleClick: function handleClick() {
	        var self = this;
	        self.setState({
	            number: Math.random()
	        });
	    },
	
	    componentWillMont: function componentWillMont() {
	        console.log('wiimont');
	    },
	
	    componentDidMount: function componentDidMount() {
	        console.log('add_listen');
	        var self = this;
	
	        self.setState({ val: self.state.val + 1 });
	        console.log(self.state.val);
	
	        self.setState({ val: self.state.val + 1 });
	        console.log(self.state.val);
	
	        setTimeout(function () {
	            console.log(self.state.val);
	            self.setState({ val: self.state.val + 1 });
	            console.log(self.state.val);
	
	            self.setState({ val: self.state.val + 1 });
	            console.log(self.state.val);
	        }, 0);
	    },
	
	    componentWillUnmout: function componentWillUnmout() {
	        console.log('remove_listen');
	    },
	
	    render: function render() {
	        return _react2.default.createElement(
	            'div',
	            { ref: 'num', onClick: this.handleClick },
	            this.state.number
	        );
	    }
	});
	
	if (typeof document != 'undefined') {
	    _reactDom2.default.render(_react2.default.createElement(Index, { number: 2 }), document.getElementById('main'));
	}
	
	exports.default = Index;

/***/ }
]);
//# sourceMappingURL=index.js.map