webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(fetch) {/*
	 * @Author: jade
	 * @Date:   2016-06-12 00:03:50
	 * @Last Modified by:   jade
	 * @Last Modified time: 2016-06-16 17:38:12
	 */
	
	'use strict';
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(39);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _reactRouter = __webpack_require__(245);
	
	var _button = __webpack_require__(174);
	
	var _button2 = _interopRequireDefault(_button);
	
	var _icon = __webpack_require__(177);
	
	var _icon2 = _interopRequireDefault(_icon);
	
	var _card = __webpack_require__(351);
	
	var _card2 = _interopRequireDefault(_card);
	
	var _col = __webpack_require__(229);
	
	var _col2 = _interopRequireDefault(_col);
	
	var _row = __webpack_require__(352);
	
	var _row2 = _interopRequireDefault(_row);
	
	var _team = __webpack_require__(353);
	
	var _team2 = _interopRequireDefault(_team);
	
	__webpack_require__(354);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Index = _react2.default.createClass({
	    displayName: 'Index',
	    render: function render() {
	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	                'h1',
	                null,
	                '我的团队'
	            ),
	            this.props.children
	        );
	    }
	});
	
	var Home = _react2.default.createClass({
	    displayName: 'Home',
	    getInitialState: function getInitialState() {
	        return {
	            teams: []
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        var self = this;
	        fetch('/team/list').then(function (res) {
	            self.setState({
	                teams: res.data
	            });
	        });
	    },
	    handleTeam: function handleTeam() {
	        var teams = this.state.teams;
	        teams.push({
	            opt: 'add'
	        });
	        this.setState({
	            teams: teams
	        });
	    },
	    render: function render() {
	        var state = this.state;
	        return _react2.default.createElement(
	            'div',
	            { className: 'mod-team' },
	            _react2.default.createElement(
	                _row2.default,
	                { gutter: 16 },
	                state.teams.map(function (item) {
	                    _react2.default.createElement(
	                        _col2.default,
	                        { key: 'team-' + item._id, className: 'gutter-row', span: 6 },
	                        _react2.default.createElement(_team2.default, { team: item })
	                    );
	                }),
	                _react2.default.createElement(
	                    _col2.default,
	                    { className: 'team-add gutter-row', span: 6, onClick: this.handleTeam },
	                    _react2.default.createElement(
	                        _card2.default,
	                        { title: '创建团队' },
	                        _react2.default.createElement(_icon2.default, { type: 'plus' })
	                    )
	                )
	            )
	        );
	    }
	});
	
	// const Item = React.createClass({});
	
	// const Team = React.createClass({});
	//<Route path=":id" component={Team} />
	//<IndexRoute component={Index}/>
	//<Route path="team/:id" component={Home} />
	_reactDom2.default.render(_react2.default.createElement(
	    _reactRouter.Router,
	    { history: _reactRouter.browserHistory },
	    _react2.default.createElement(
	        _reactRouter.Route,
	        { path: '/team', component: Index },
	        _react2.default.createElement(_reactRouter.IndexRoute, { component: Home }),
	        _react2.default.createElement(_reactRouter.Route, { path: ':id', component: Home })
	    )
	), document.getElementById('main'));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(346)))

/***/ },

/***/ 174:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _button = __webpack_require__(175);
	
	var _button2 = _interopRequireDefault(_button);
	
	var _buttonGroup = __webpack_require__(178);
	
	var _buttonGroup2 = _interopRequireDefault(_buttonGroup);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	_button2["default"].Group = _buttonGroup2["default"];
	exports["default"] = _button2["default"];
	module.exports = exports['default'];

/***/ },

/***/ 175:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _class, _temp2, _initialiseProps;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(176);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _reactDom = __webpack_require__(39);
	
	var _icon = __webpack_require__(177);
	
	var _icon2 = _interopRequireDefault(_icon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
	var isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
	function isString(str) {
	  return typeof str === 'string';
	}
	
	// Insert one space between two chinese characters automatically.
	function insertSpace(child) {
	  if (isString(child.type) && isTwoCNChar(child.props.children)) {
	    return _react2["default"].cloneElement(child, {}, child.props.children.split('').join(' '));
	  }
	  if (isString(child)) {
	    if (isTwoCNChar(child)) {
	      child = child.split('').join(' ');
	    }
	    return _react2["default"].createElement(
	      'span',
	      null,
	      child
	    );
	  }
	  return child;
	}
	
	var Button = (_temp2 = _class = function (_React$Component) {
	  _inherits(Button, _React$Component);
	
	  function Button() {
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, Button);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  Button.prototype.componentWillUnmount = function componentWillUnmount() {
	    if (this.clickedTimeout) {
	      clearTimeout(this.clickedTimeout);
	    }
	    if (this.timeout) {
	      clearTimeout(this.timeout);
	    }
	  };
	
	  // Handle auto focus when click button in Chrome
	
	
	  Button.prototype.render = function render() {
	    var _classNames;
	
	    var props = this.props;
	    var type = props.type;
	    var shape = props.shape;
	    var size = props.size;
	    var className = props.className;
	    var htmlType = props.htmlType;
	    var children = props.children;
	    var icon = props.icon;
	    var loading = props.loading;
	    var prefixCls = props.prefixCls;
	
	    var others = _objectWithoutProperties(props, ['type', 'shape', 'size', 'className', 'htmlType', 'children', 'icon', 'loading', 'prefixCls']);
	
	    // large => lg
	    // small => sm
	
	
	    var sizeCls = {
	      large: 'lg',
	      small: 'sm'
	    }[size] || '';
	
	    var classes = (0, _classnames2["default"])((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, prefixCls + '-' + type, type), _defineProperty(_classNames, prefixCls + '-' + shape, shape), _defineProperty(_classNames, prefixCls + '-' + sizeCls, sizeCls), _defineProperty(_classNames, prefixCls + '-icon-only', !children && icon), _defineProperty(_classNames, prefixCls + '-loading', loading), _defineProperty(_classNames, className, className), _classNames));
	
	    var iconType = loading ? 'loading' : icon;
	
	    var kids = _react2["default"].Children.map(children, insertSpace);
	
	    return _react2["default"].createElement(
	      'button',
	      _extends({}, others, {
	        type: htmlType || 'button',
	        className: classes,
	        onMouseUp: this.handleMouseUp,
	        onClick: this.handleClick
	      }),
	      iconType ? _react2["default"].createElement(_icon2["default"], { type: iconType }) : null,
	      kids
	    );
	  };
	
	  return Button;
	}(_react2["default"].Component), _class.defaultProps = {
	  prefixCls: 'ant-btn',
	  onClick: function onClick() {},
	
	  loading: false
	}, _class.propTypes = {
	  type: _react2["default"].PropTypes.string,
	  shape: _react2["default"].PropTypes.oneOf(['circle', 'circle-outline']),
	  size: _react2["default"].PropTypes.oneOf(['large', 'default', 'small']),
	  htmlType: _react2["default"].PropTypes.oneOf(['submit', 'button', 'reset']),
	  onClick: _react2["default"].PropTypes.func,
	  loading: _react2["default"].PropTypes.bool,
	  className: _react2["default"].PropTypes.string,
	  icon: _react2["default"].PropTypes.string
	}, _initialiseProps = function _initialiseProps() {
	  var _this2 = this;
	
	  this.clearButton = function (button) {
	    button.className = button.className.replace(' ' + _this2.props.prefixCls + '-clicked', '');
	  };
	
	  this.handleClick = function () {
	    var _props;
	
	    // Add click effect
	    var buttonNode = (0, _reactDom.findDOMNode)(_this2);
	    _this2.clearButton(buttonNode);
	    _this2.clickedTimeout = setTimeout(function () {
	      return buttonNode.className += ' ' + _this2.props.prefixCls + '-clicked';
	    }, 10);
	    clearTimeout(_this2.timeout);
	    _this2.timeout = setTimeout(function () {
	      return _this2.clearButton(buttonNode);
	    }, 500);
	
	    (_props = _this2.props).onClick.apply(_props, arguments);
	  };
	
	  this.handleMouseUp = function (e) {
	    (0, _reactDom.findDOMNode)(_this2).blur();
	    if (_this2.props.onMouseUp) {
	      _this2.props.onMouseUp(e);
	    }
	  };
	}, _temp2);
	exports["default"] = Button;
	module.exports = exports['default'];

/***/ },

/***/ 178:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports["default"] = ButtonGroup;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(176);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var prefix = 'ant-btn-group-';
	
	function ButtonGroup(props) {
	  var _classNames;
	
	  var size = props.size;
	  var className = props.className;
	
	  var others = _objectWithoutProperties(props, ['size', 'className']);
	
	  // large => lg
	  // small => sm
	
	
	  var sizeCls = {
	    large: 'lg',
	    small: 'sm'
	  }[size] || '';
	
	  var classes = (0, _classnames2["default"])((_classNames = {
	    'ant-btn-group': true
	  }, _defineProperty(_classNames, prefix + sizeCls, sizeCls), _defineProperty(_classNames, className, className), _classNames));
	
	  return _react2["default"].createElement('div', _extends({}, others, { className: classes }));
	}
	
	ButtonGroup.propTypes = {
	  size: _react2["default"].PropTypes.oneOf(['large', 'small'])
	};
	module.exports = exports['default'];

/***/ },

/***/ 229:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _layout = __webpack_require__(230);
	
	exports["default"] = _layout.Col;
	module.exports = exports['default'];

/***/ },

/***/ 230:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Col = exports.Row = undefined;
	
	var _row = __webpack_require__(231);
	
	var _row2 = _interopRequireDefault(_row);
	
	var _col = __webpack_require__(232);
	
	var _col2 = _interopRequireDefault(_col);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	exports.Row = _row2["default"];
	exports.Col = _col2["default"];

/***/ },

/***/ 231:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _class, _temp;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(176);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var Row = (_temp = _class = function (_React$Component) {
	  _inherits(Row, _React$Component);
	
	  function Row() {
	    _classCallCheck(this, Row);
	
	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }
	
	  Row.prototype.render = function render() {
	    var _classNames;
	
	    var _props = this.props;
	    var type = _props.type;
	    var justify = _props.justify;
	    var align = _props.align;
	    var className = _props.className;
	    var gutter = _props.gutter;
	    var style = _props.style;
	    var children = _props.children;
	
	    var others = _objectWithoutProperties(_props, ['type', 'justify', 'align', 'className', 'gutter', 'style', 'children']);
	
	    var classes = (0, _classnames2["default"])((_classNames = {
	      'ant-row': !type
	    }, _defineProperty(_classNames, 'ant-row-' + type, type), _defineProperty(_classNames, 'ant-row-' + type + '-' + justify, justify), _defineProperty(_classNames, 'ant-row-' + type + '-' + align, align), _defineProperty(_classNames, className, className), _classNames));
	    var rowStyle = gutter > 0 ? _extends({
	      marginLeft: gutter / -2,
	      marginRight: gutter / -2
	    }, style) : style;
	    var cols = _react.Children.map(children, function (col) {
	      if (!col) return null;
	
	      return (0, _react.cloneElement)(col, {
	        style: gutter > 0 ? _extends({
	          paddingLeft: gutter / 2,
	          paddingRight: gutter / 2
	        }, col.props.style) : col.props.style
	      });
	    });
	    return _react2["default"].createElement(
	      'div',
	      _extends({}, others, { className: classes, style: rowStyle }),
	      cols
	    );
	  };
	
	  return Row;
	}(_react2["default"].Component), _class.defaultProps = {
	  gutter: 0
	}, _class.propTypes = {
	  type: _react2["default"].PropTypes.string,
	  align: _react2["default"].PropTypes.string,
	  justify: _react2["default"].PropTypes.string,
	  className: _react2["default"].PropTypes.string,
	  children: _react2["default"].PropTypes.node,
	  gutter: _react2["default"].PropTypes.number
	}, _temp);
	exports["default"] = Row;
	module.exports = exports['default'];

/***/ },

/***/ 232:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports["default"] = Col;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(176);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var stringOrNumber = _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]);
	var objectOrNumber = _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.number]);
	
	function Col(props) {
	  var _extends3;
	
	  var span = props.span;
	  var order = props.order;
	  var offset = props.offset;
	  var push = props.push;
	  var pull = props.pull;
	  var className = props.className;
	  var children = props.children;
	
	  var others = _objectWithoutProperties(props, ['span', 'order', 'offset', 'push', 'pull', 'className', 'children']);
	
	  var sizeClassObj = {};
	  ['xs', 'sm', 'md', 'lg'].forEach(function (size) {
	    var _extends2;
	
	    var sizeProps = {};
	    if (typeof props[size] === 'number') {
	      sizeProps.span = props[size];
	    } else if (_typeof(props[size]) === 'object') {
	      sizeProps = props[size] || {};
	    }
	    sizeClassObj = _extends({}, sizeClassObj, (_extends2 = {}, _defineProperty(_extends2, 'ant-col-' + size + '-' + sizeProps.span, sizeProps.span !== undefined), _defineProperty(_extends2, 'ant-col-' + size + '-order-' + sizeProps.order, sizeProps.order), _defineProperty(_extends2, 'ant-col-' + size + '-offset-' + sizeProps.offset, sizeProps.offset), _defineProperty(_extends2, 'ant-col-' + size + '-push-' + sizeProps.push, sizeProps.push), _defineProperty(_extends2, 'ant-col-' + size + '-pull-' + sizeProps.pull, sizeProps.pull), _extends2));
	  });
	  var classes = (0, _classnames2["default"])(_extends((_extends3 = {}, _defineProperty(_extends3, 'ant-col-' + span, span !== undefined), _defineProperty(_extends3, 'ant-col-order-' + order, order), _defineProperty(_extends3, 'ant-col-offset-' + offset, offset), _defineProperty(_extends3, 'ant-col-push-' + push, push), _defineProperty(_extends3, 'ant-col-pull-' + pull, pull), _defineProperty(_extends3, className, !!className), _extends3), sizeClassObj));
	
	  return _react2["default"].createElement(
	    'div',
	    _extends({}, others, { className: classes }),
	    children
	  );
	}
	
	Col.propTypes = {
	  span: stringOrNumber,
	  order: stringOrNumber,
	  offset: stringOrNumber,
	  push: stringOrNumber,
	  pull: stringOrNumber,
	  className: _react.PropTypes.string,
	  children: _react.PropTypes.node,
	  xs: objectOrNumber,
	  sm: objectOrNumber,
	  md: objectOrNumber,
	  lg: objectOrNumber
	};
	module.exports = exports['default'];

/***/ },

/***/ 346:
/***/ function(module, exports, __webpack_require__) {

	/*
	 * @Author: jade
	 * @Date:   2016-06-15 17:07:02
	 * @Last Modified by:   jade
	 * @Last Modified time: 2016-06-15 19:54:27
	 */
	
	'use strict';
	
	var _message = __webpack_require__(347);
	
	var _message2 = _interopRequireDefault(_message);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * [https://github.com/github/fetch，下载该文件进行修改的，该库竟然不支持cmd格式]
	 * @param  {[type]} url     [description]
	 * @param  {Object} options [description]
	 * @return {[type]}         [description]
	 */
	var self = function fetch(url) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    var opt = Object.assign({
	        method: 'GET',
	        headers: {
	            'Accept': 'application/json'
	            // 'Content-Type': 'application/json'
	        }
	    }, options);
	    if (opt.method.toLowerCase() === 'get' && opt.body) {
	        (function () {
	            var body = opt.body;
	            var query = Object.keys(body).map(function (key) {
	                return key + '=' + body[key];
	            });
	            if (url.indexOf('?') != -1) {
	                url += '&';
	            } else {
	                url += '?';
	            }
	            url += query.join('&');
	            delete opt.body;
	        })();
	    }
	
	    var res = self.fetch(url, opt).then(function (response) {
	        if (response.status >= 200 && response.status < 300) {
	            return response;
	        } else {
	            _message2.default.error('服务器忙晕了，请稍后再试');
	            return false;
	        }
	    }).then(function (response) {
	        return response.json();
	    }).then(function (response) {
	        if (response.code != 200) {
	            _message2.default.error(response.message || '服务器忙晕了，请稍后再试');
	            return false;
	        }
	        return response;
	    });
	    return res;
	};
	
	(function (self) {
	    'use strict';
	
	    if (self.fetch) {
	        return;
	    }
	
	    var support = {
	        searchParams: 'URLSearchParams' in self,
	        iterable: 'Symbol' in self && 'iterator' in Symbol,
	        blob: 'FileReader' in self && 'Blob' in self && function () {
	            try {
	                new Blob();
	                return true;
	            } catch (e) {
	                return false;
	            }
	        }(),
	        formData: 'FormData' in self,
	        arrayBuffer: 'ArrayBuffer' in self
	    };
	
	    function normalizeName(name) {
	        if (typeof name !== 'string') {
	            name = String(name);
	        }
	        if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	            throw new TypeError('Invalid character in header field name');
	        }
	        return name.toLowerCase();
	    }
	
	    function normalizeValue(value) {
	        if (typeof value !== 'string') {
	            value = String(value);
	        }
	        return value;
	    }
	
	    // Build a destructive iterator for the value list
	    function iteratorFor(items) {
	        var iterator = {
	            next: function next() {
	                var value = items.shift();
	                return {
	                    done: value === undefined,
	                    value: value
	                };
	            }
	        };
	
	        if (support.iterable) {
	            iterator[Symbol.iterator] = function () {
	                return iterator;
	            };
	        }
	
	        return iterator;
	    }
	
	    function Headers(headers) {
	        this.map = {};
	
	        if (headers instanceof Headers) {
	            headers.forEach(function (value, name) {
	                this.append(name, value);
	            }, this);
	        } else if (headers) {
	            Object.getOwnPropertyNames(headers).forEach(function (name) {
	                this.append(name, headers[name]);
	            }, this);
	        }
	    }
	
	    Headers.prototype.append = function (name, value) {
	        name = normalizeName(name);
	        value = normalizeValue(value);
	        var list = this.map[name];
	        if (!list) {
	            list = [];
	            this.map[name] = list;
	        }
	        list.push(value);
	    };
	
	    Headers.prototype['delete'] = function (name) {
	        delete this.map[normalizeName(name)];
	    };
	
	    Headers.prototype.get = function (name) {
	        var values = this.map[normalizeName(name)];
	        return values ? values[0] : null;
	    };
	
	    Headers.prototype.getAll = function (name) {
	        return this.map[normalizeName(name)] || [];
	    };
	
	    Headers.prototype.has = function (name) {
	        return this.map.hasOwnProperty(normalizeName(name));
	    };
	
	    Headers.prototype.set = function (name, value) {
	        this.map[normalizeName(name)] = [normalizeValue(value)];
	    };
	
	    Headers.prototype.forEach = function (callback, thisArg) {
	        Object.getOwnPropertyNames(this.map).forEach(function (name) {
	            this.map[name].forEach(function (value) {
	                callback.call(thisArg, value, name, this);
	            }, this);
	        }, this);
	    };
	
	    Headers.prototype.keys = function () {
	        var items = [];
	        this.forEach(function (value, name) {
	            items.push(name);
	        });
	        return iteratorFor(items);
	    };
	
	    Headers.prototype.values = function () {
	        var items = [];
	        this.forEach(function (value) {
	            items.push(value);
	        });
	        return iteratorFor(items);
	    };
	
	    Headers.prototype.entries = function () {
	        var items = [];
	        this.forEach(function (value, name) {
	            items.push([name, value]);
	        });
	        return iteratorFor(items);
	    };
	
	    if (support.iterable) {
	        Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
	    }
	
	    function consumed(body) {
	        if (body.bodyUsed) {
	            return Promise.reject(new TypeError('Already read'));
	        }
	        body.bodyUsed = true;
	    }
	
	    function fileReaderReady(reader) {
	        return new Promise(function (resolve, reject) {
	            reader.onload = function () {
	                resolve(reader.result);
	            };
	            reader.onerror = function () {
	                reject(reader.error);
	            };
	        });
	    }
	
	    function readBlobAsArrayBuffer(blob) {
	        var reader = new FileReader();
	        reader.readAsArrayBuffer(blob);
	        return fileReaderReady(reader);
	    }
	
	    function readBlobAsText(blob) {
	        var reader = new FileReader();
	        reader.readAsText(blob);
	        return fileReaderReady(reader);
	    }
	
	    function Body() {
	        this.bodyUsed = false;
	
	        this._initBody = function (body) {
	            this._bodyInit = body;
	            if (typeof body === 'string') {
	                this._bodyText = body;
	            } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	                this._bodyBlob = body;
	            } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	                this._bodyFormData = body;
	            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	                this._bodyText = body.toString();
	            } else if (!body) {
	                this._bodyText = '';
	            } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	                // Only support ArrayBuffers for POST method.
	                // Receiving ArrayBuffers happens via Blobs, instead.
	            } else {
	                    throw new Error('unsupported BodyInit type');
	                }
	
	            if (!this.headers.get('content-type')) {
	                if (typeof body === 'string') {
	                    this.headers.set('content-type', 'text/plain;charset=UTF-8');
	                } else if (this._bodyBlob && this._bodyBlob.type) {
	                    this.headers.set('content-type', this._bodyBlob.type);
	                } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	                    this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
	                }
	            }
	        };
	
	        if (support.blob) {
	            this.blob = function () {
	                var rejected = consumed(this);
	                if (rejected) {
	                    return rejected;
	                }
	
	                if (this._bodyBlob) {
	                    return Promise.resolve(this._bodyBlob);
	                } else if (this._bodyFormData) {
	                    throw new Error('could not read FormData body as blob');
	                } else {
	                    return Promise.resolve(new Blob([this._bodyText]));
	                }
	            };
	
	            this.arrayBuffer = function () {
	                return this.blob().then(readBlobAsArrayBuffer);
	            };
	
	            this.text = function () {
	                var rejected = consumed(this);
	                if (rejected) {
	                    return rejected;
	                }
	
	                if (this._bodyBlob) {
	                    return readBlobAsText(this._bodyBlob);
	                } else if (this._bodyFormData) {
	                    throw new Error('could not read FormData body as text');
	                } else {
	                    return Promise.resolve(this._bodyText);
	                }
	            };
	        } else {
	            this.text = function () {
	                var rejected = consumed(this);
	                return rejected ? rejected : Promise.resolve(this._bodyText);
	            };
	        }
	
	        if (support.formData) {
	            this.formData = function () {
	                return this.text().then(decode);
	            };
	        }
	
	        this.json = function () {
	            return this.text().then(JSON.parse);
	        };
	
	        return this;
	    }
	
	    // HTTP methods whose capitalization should be normalized
	    var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
	
	    function normalizeMethod(method) {
	        var upcased = method.toUpperCase();
	        return methods.indexOf(upcased) > -1 ? upcased : method;
	    }
	
	    function Request(input, options) {
	        options = options || {};
	        var body = options.body;
	        if (Request.prototype.isPrototypeOf(input)) {
	            if (input.bodyUsed) {
	                throw new TypeError('Already read');
	            }
	            this.url = input.url;
	            this.credentials = input.credentials;
	            if (!options.headers) {
	                this.headers = new Headers(input.headers);
	            }
	            this.method = input.method;
	            this.mode = input.mode;
	            if (!body) {
	                body = input._bodyInit;
	                input.bodyUsed = true;
	            }
	        } else {
	            this.url = input;
	        }
	
	        this.credentials = options.credentials || this.credentials || 'omit';
	        if (options.headers || !this.headers) {
	            this.headers = new Headers(options.headers);
	        }
	        this.method = normalizeMethod(options.method || this.method || 'GET');
	        this.mode = options.mode || this.mode || null;
	        this.referrer = null;
	
	        if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	            throw new TypeError('Body not allowed for GET or HEAD requests');
	        }
	        this._initBody(body);
	    }
	
	    Request.prototype.clone = function () {
	        return new Request(this);
	    };
	
	    function decode(body) {
	        var form = new FormData();
	        body.trim().split('&').forEach(function (bytes) {
	            if (bytes) {
	                var split = bytes.split('=');
	                var name = split.shift().replace(/\+/g, ' ');
	                var value = split.join('=').replace(/\+/g, ' ');
	                form.append(decodeURIComponent(name), decodeURIComponent(value));
	            }
	        });
	        return form;
	    }
	
	    function headers(xhr) {
	        var head = new Headers();
	        var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n');
	        pairs.forEach(function (header) {
	            var split = header.trim().split(':');
	            var key = split.shift().trim();
	            var value = split.join(':').trim();
	            head.append(key, value);
	        });
	        return head;
	    }
	
	    Body.call(Request.prototype);
	
	    function Response(bodyInit, options) {
	        if (!options) {
	            options = {};
	        }
	
	        this.type = 'default';
	        this.status = options.status;
	        this.ok = this.status >= 200 && this.status < 300;
	        this.statusText = options.statusText;
	        this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
	        this.url = options.url || '';
	        this._initBody(bodyInit);
	    }
	
	    Body.call(Response.prototype);
	
	    Response.prototype.clone = function () {
	        return new Response(this._bodyInit, {
	            status: this.status,
	            statusText: this.statusText,
	            headers: new Headers(this.headers),
	            url: this.url
	        });
	    };
	
	    Response.error = function () {
	        var response = new Response(null, {
	            status: 0,
	            statusText: ''
	        });
	        response.type = 'error';
	        return response;
	    };
	
	    var redirectStatuses = [301, 302, 303, 307, 308];
	
	    Response.redirect = function (url, status) {
	        if (redirectStatuses.indexOf(status) === -1) {
	            throw new RangeError('Invalid status code');
	        }
	
	        return new Response(null, {
	            status: status,
	            headers: {
	                location: url
	            }
	        });
	    };
	
	    self.Headers = Headers;
	    self.Request = Request;
	    self.Response = Response;
	
	    self.fetch = function (input, init) {
	        return new Promise(function (resolve, reject) {
	            var request;
	            if (Request.prototype.isPrototypeOf(input) && !init) {
	                request = input;
	            } else {
	                request = new Request(input, init);
	            }
	
	            var xhr = new XMLHttpRequest();
	
	            function responseURL() {
	                if ('responseURL' in xhr) {
	                    return xhr.responseURL;
	                }
	
	                // Avoid security warnings on getResponseHeader when not allowed by CORS
	                if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	                    return xhr.getResponseHeader('X-Request-URL');
	                }
	
	                return;
	            }
	
	            xhr.onload = function () {
	                var options = {
	                    status: xhr.status,
	                    statusText: xhr.statusText,
	                    headers: headers(xhr),
	                    url: responseURL()
	                };
	                var body = 'response' in xhr ? xhr.response : xhr.responseText;
	                resolve(new Response(body, options));
	            };
	
	            xhr.onerror = function () {
	                reject(new TypeError('Network request failed'));
	            };
	
	            xhr.ontimeout = function () {
	                reject(new TypeError('Network request failed'));
	            };
	
	            xhr.open(request.method, request.url, true);
	
	            if (request.credentials === 'include') {
	                xhr.withCredentials = true;
	            }
	
	            if ('responseType' in xhr && support.blob) {
	                xhr.responseType = 'blob';
	            }
	
	            request.headers.forEach(function (value, name) {
	                xhr.setRequestHeader(name, value);
	            });
	
	            xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
	        });
	    };
	    self.fetch.polyfill = true;
	})(typeof self !== 'undefined' ? self : undefined);
	
	module.exports = self;

/***/ },

/***/ 347:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _rcNotification = __webpack_require__(348);
	
	var _rcNotification2 = _interopRequireDefault(_rcNotification);
	
	var _icon = __webpack_require__(177);
	
	var _icon2 = _interopRequireDefault(_icon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var defaultDuration = 1.5;
	var defaultTop = void 0;
	var messageInstance = void 0;
	var key = 1;
	var prefixCls = 'ant-message';
	
	function getMessageInstance() {
	  messageInstance = messageInstance || _rcNotification2["default"].newInstance({
	    prefixCls: prefixCls,
	    transitionName: 'move-up',
	    style: { top: defaultTop } });
	  // 覆盖原来的样式
	  return messageInstance;
	}
	
	function notice(content) {
	  var duration = arguments.length <= 1 || arguments[1] === undefined ? defaultDuration : arguments[1];
	  var type = arguments[2];
	  var onClose = arguments[3];
	
	  var iconType = {
	    info: 'info-circle',
	    success: 'check-circle',
	    error: 'cross-circle',
	    warning: 'exclamation-circle',
	    loading: 'loading'
	  }[type];
	
	  var instance = getMessageInstance();
	  instance.notice({
	    key: key,
	    duration: duration,
	    style: {},
	    content: _react2["default"].createElement(
	      'div',
	      { className: prefixCls + '-custom-content ' + prefixCls + '-' + type },
	      _react2["default"].createElement(_icon2["default"], { type: iconType }),
	      _react2["default"].createElement(
	        'span',
	        null,
	        content
	      )
	    ),
	    onClose: onClose
	  });
	  return function () {
	    var target = key++;
	    return function () {
	      instance.removeNotice(target);
	    };
	  }();
	}
	
	exports["default"] = {
	  info: function info(content, duration, onClose) {
	    return notice(content, duration, 'info', onClose);
	  },
	  success: function success(content, duration, onClose) {
	    return notice(content, duration, 'success', onClose);
	  },
	  error: function error(content, duration, onClose) {
	    return notice(content, duration, 'error', onClose);
	  },
	
	  // Departed usage, please use warning()
	  warn: function warn(content, duration, onClose) {
	    return notice(content, duration, 'warning', onClose);
	  },
	  warning: function warning(content, duration, onClose) {
	    return notice(content, duration, 'warning', onClose);
	  },
	  loading: function loading(content, duration, onClose) {
	    return notice(content, duration, 'loading', onClose);
	  },
	  config: function config(options) {
	    if ('top' in options) {
	      defaultTop = options.top;
	    }
	    if ('duration' in options) {
	      defaultDuration = options.duration;
	    }
	    if ('prefixCls' in options) {
	      prefixCls = options.prefixCls;
	    }
	  },
	  destroy: function destroy() {
	    if (messageInstance) {
	      messageInstance.destroy();
	      messageInstance = null;
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 348:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Notification = __webpack_require__(349);
	
	var _Notification2 = _interopRequireDefault(_Notification);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	exports["default"] = _Notification2["default"];
	module.exports = exports['default'];

/***/ },

/***/ 349:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(39);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rcAnimate = __webpack_require__(234);
	
	var _rcAnimate2 = _interopRequireDefault(_rcAnimate);
	
	var _rcUtil = __webpack_require__(312);
	
	var _classnames = __webpack_require__(176);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Notice = __webpack_require__(350);
	
	var _Notice2 = _interopRequireDefault(_Notice);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var seed = 0;
	var now = Date.now();
	
	function getUuid() {
	  return 'rcNotification_' + now + '_' + seed++;
	}
	
	var Notification = _react2["default"].createClass({
	  displayName: 'Notification',
	
	  propTypes: {
	    prefixCls: _react.PropTypes.string,
	    transitionName: _react.PropTypes.string,
	    animation: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object]),
	    style: _react.PropTypes.object
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      prefixCls: 'rc-notification',
	      animation: 'fade',
	      style: {
	        top: 65,
	        left: '50%'
	      }
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      notices: []
	    };
	  },
	  getTransitionName: function getTransitionName() {
	    var props = this.props;
	    var transitionName = props.transitionName;
	    if (!transitionName && props.animation) {
	      transitionName = props.prefixCls + '-' + props.animation;
	    }
	    return transitionName;
	  },
	  add: function add(notice) {
	    var key = notice.key = notice.key || getUuid();
	    this.setState(function (previousState) {
	      var notices = previousState.notices;
	      if (!notices.filter(function (v) {
	        return v.key === key;
	      }).length) {
	        return {
	          notices: notices.concat(notice)
	        };
	      }
	    });
	  },
	  remove: function remove(key) {
	    this.setState(function (previousState) {
	      return {
	        notices: previousState.notices.filter(function (notice) {
	          return notice.key !== key;
	        })
	      };
	    });
	  },
	  render: function render() {
	    var _this = this,
	        _className;
	
	    var props = this.props;
	    var noticeNodes = this.state.notices.map(function (notice) {
	      var onClose = (0, _rcUtil.createChainedFunction)(_this.remove.bind(_this, notice.key), notice.onClose);
	      return _react2["default"].createElement(
	        _Notice2["default"],
	        _extends({
	          prefixCls: props.prefixCls
	        }, notice, {
	          onClose: onClose
	        }),
	        notice.content
	      );
	    });
	    var className = (_className = {}, _defineProperty(_className, props.prefixCls, 1), _defineProperty(_className, props.className, !!props.className), _className);
	    return _react2["default"].createElement(
	      'div',
	      { className: (0, _classnames2["default"])(className), style: props.style },
	      _react2["default"].createElement(
	        _rcAnimate2["default"],
	        { transitionName: this.getTransitionName() },
	        noticeNodes
	      )
	    );
	  }
	});
	
	Notification.newInstance = function newNotificationInstance(properties) {
	  var props = properties || {};
	  var div = document.createElement('div');
	  document.body.appendChild(div);
	  var notification = _reactDom2["default"].render(_react2["default"].createElement(Notification, props), div);
	  return {
	    notice: function notice(noticeProps) {
	      notification.add(noticeProps);
	    },
	    removeNotice: function removeNotice(key) {
	      notification.remove(key);
	    },
	
	    component: notification,
	    destroy: function destroy() {
	      _reactDom2["default"].unmountComponentAtNode(div);
	      document.body.removeChild(div);
	    }
	  };
	};
	
	exports["default"] = Notification;
	module.exports = exports['default'];

/***/ },

/***/ 350:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(176);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var Notice = _react2["default"].createClass({
	  displayName: 'Notice',
	
	  propTypes: {
	    duration: _react.PropTypes.number,
	    onClose: _react.PropTypes.func,
	    children: _react.PropTypes.any
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      onEnd: function onEnd() {},
	      onClose: function onClose() {},
	
	      duration: 1.5,
	      style: {
	        right: '50%'
	      }
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    var _this = this;
	
	    if (this.props.duration) {
	      this.closeTimer = setTimeout(function () {
	        _this.close();
	      }, this.props.duration * 1000);
	    }
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    this.clearCloseTimer();
	  },
	  clearCloseTimer: function clearCloseTimer() {
	    if (this.closeTimer) {
	      clearTimeout(this.closeTimer);
	      this.closeTimer = null;
	    }
	  },
	  close: function close() {
	    this.clearCloseTimer();
	    this.props.onClose();
	  },
	  render: function render() {
	    var _className;
	
	    var props = this.props;
	    var componentClass = props.prefixCls + '-notice';
	    var className = (_className = {}, _defineProperty(_className, '' + componentClass, 1), _defineProperty(_className, componentClass + '-closable', props.closable), _defineProperty(_className, props.className, !!props.className), _className);
	    return _react2["default"].createElement(
	      'div',
	      { className: (0, _classnames2["default"])(className), style: props.style },
	      _react2["default"].createElement(
	        'div',
	        { className: componentClass + '-content' },
	        props.children
	      ),
	      props.closable ? _react2["default"].createElement(
	        'a',
	        { tabIndex: '0', onClick: this.close, className: componentClass + '-close' },
	        _react2["default"].createElement('span', { className: componentClass + '-close-x' })
	      ) : null
	    );
	  }
	});
	
	exports["default"] = Notice;
	module.exports = exports['default'];

/***/ },

/***/ 351:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(176);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	exports["default"] = function (props) {
	  var _classNames;
	
	  var _props$prefixCls = props.prefixCls;
	  var prefixCls = _props$prefixCls === undefined ? 'ant-card' : _props$prefixCls;
	  var className = props.className;
	  var children = props.children;
	  var extra = props.extra;
	  var bodyStyle = props.bodyStyle;
	  var title = props.title;
	  var loading = props.loading;
	  var _props$bordered = props.bordered;
	  var bordered = _props$bordered === undefined ? true : _props$bordered;
	
	  var other = _objectWithoutProperties(props, ['prefixCls', 'className', 'children', 'extra', 'bodyStyle', 'title', 'loading', 'bordered']);
	
	  var classString = (0, _classnames2["default"])((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, prefixCls + '-loading', loading), _defineProperty(_classNames, prefixCls + '-bordered', bordered), _classNames));
	
	  if (loading) {
	    children = _react2["default"].createElement(
	      'div',
	      null,
	      _react2["default"].createElement(
	        'p',
	        null,
	        '████████████████████████'
	      ),
	      _react2["default"].createElement(
	        'p',
	        null,
	        '██████　███████████████████'
	      ),
	      _react2["default"].createElement(
	        'p',
	        null,
	        '██████████████　██████████'
	      ),
	      _react2["default"].createElement(
	        'p',
	        null,
	        '█████　██████　█████████████'
	      ),
	      _react2["default"].createElement(
	        'p',
	        null,
	        '███████████　██████████　███'
	      )
	    );
	  }
	
	  var head = title ? _react2["default"].createElement(
	    'div',
	    { className: prefixCls + '-head' },
	    _react2["default"].createElement(
	      'h3',
	      { className: prefixCls + '-head-title' },
	      title
	    )
	  ) : null;
	
	  return _react2["default"].createElement(
	    'div',
	    _extends({}, other, { className: classString }),
	    head,
	    extra ? _react2["default"].createElement(
	      'div',
	      { className: prefixCls + '-extra' },
	      extra
	    ) : null,
	    _react2["default"].createElement(
	      'div',
	      { className: prefixCls + '-body', style: bodyStyle },
	      children
	    )
	  );
	};
	
	module.exports = exports['default'];

/***/ },

/***/ 352:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _layout = __webpack_require__(230);
	
	exports["default"] = _layout.Row;
	module.exports = exports['default'];

/***/ },

/***/ 353:
/***/ function(module, exports, __webpack_require__) {

	/*
	 * @Author: jade
	 * @Date:   2016-06-12 00:03:50
	 * @Last Modified by:   jade
	 * @Last Modified time: 2016-06-16 11:58:14
	 */
	
	'use strict';
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(39);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _button = __webpack_require__(174);
	
	var _button2 = _interopRequireDefault(_button);
	
	var _icon = __webpack_require__(177);
	
	var _icon2 = _interopRequireDefault(_icon);
	
	var _card = __webpack_require__(351);
	
	var _card2 = _interopRequireDefault(_card);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Team = _react2.default.createClass({
	    displayName: 'Team',
	    getInitialState: function getInitialState() {
	        return {
	            team: {}
	        };
	    },
	    handleTeam: function handleTeam() {
	        var type = arguments.length <= 0 || arguments[0] === undefined ? 'add' : arguments[0];
	        var team = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	        return function (evt) {
	            if (type == 'add') {
	                //添加
	            }
	        };
	    },
	    render: function render() {
	        var state = this.state;
	        var item = state.item;
	        return _react2.default.createElement(
	            _card2.default,
	            { title: item.name },
	            item.description
	        );
	    }
	});

/***/ },

/***/ 354:
305

});
//# sourceMappingURL=team.js.map