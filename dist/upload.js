webpackJsonp([7],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(39);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _classnames = __webpack_require__(176);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _reactRouter = __webpack_require__(447);
	
	var _upload = __webpack_require__(614);
	
	var _upload2 = _interopRequireDefault(_upload);
	
	var _button = __webpack_require__(174);
	
	var _button2 = _interopRequireDefault(_button);
	
	var _message = __webpack_require__(261);
	
	var _message2 = _interopRequireDefault(_message);
	
	var _icon = __webpack_require__(177);
	
	var _icon2 = _interopRequireDefault(_icon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var UploadV = function (_Component) {
	  _inherits(UploadV, _Component);
	
	  function UploadV(props, context) {
	    _classCallCheck(this, UploadV);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(UploadV).call(this, props, context));
	  }
	
	  _createClass(UploadV, [{
	    key: 'render',
	    value: function render() {
	      var props = {
	        name: 'file',
	        action: '/upload',
	        onChange: function onChange(info) {
	          console.log(info);
	          if (info.file.status !== 'uploading') {
	            console.log(info.file, info.fileList);
	          }
	          if (info.file.status === 'done') {
	            _message2.default.success(info.file.name + ' 上传成功。');
	          } else if (info.file.status === 'error') {
	            _message2.default.error(info.file.name + ' 上传失败。');
	          }
	        }
	      };
	      return _react2.default.createElement(
	        'div',
	        { className: 'mod-demo' },
	        _react2.default.createElement(
	          _upload2.default,
	          props,
	          _react2.default.createElement(
	            _button2.default,
	            { type: 'ghost' },
	            _react2.default.createElement(_icon2.default, { type: 'upload' }),
	            ' 点击上传'
	          )
	        )
	      );
	    }
	  }]);
	
	  return UploadV;
	}(_react.Component);
	
	UploadV.propTypes = {};
	
	
	_reactDom2.default.render(_react2.default.createElement(UploadV, null), document.getElementById('main'));

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
	        onClick: this.handleClick }),
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
	    setTimeout(function () {
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

/***/ 261:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _rcNotification = __webpack_require__(262);
	
	var _rcNotification2 = _interopRequireDefault(_rcNotification);
	
	var _icon = __webpack_require__(177);
	
	var _icon2 = _interopRequireDefault(_icon);
	
	var _warning = __webpack_require__(285);
	
	var _warning2 = _interopRequireDefault(_warning);
	
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
	    (0, _warning2["default"])(false, 'message.warn() is departed, please use message.warning()');
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

/***/ 262:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Notification = __webpack_require__(263);
	
	var _Notification2 = _interopRequireDefault(_Notification);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	exports["default"] = _Notification2["default"];
	module.exports = exports['default'];

/***/ },

/***/ 263:
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
	
	var _rcAnimate = __webpack_require__(226);
	
	var _rcAnimate2 = _interopRequireDefault(_rcAnimate);
	
	var _rcUtil = __webpack_require__(264);
	
	var _classnames = __webpack_require__(176);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Notice = __webpack_require__(284);
	
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

/***/ 284:
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

/***/ 614:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = undefined;
	
	var _class, _temp;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _rcUpload = __webpack_require__(615);
	
	var _rcUpload2 = _interopRequireDefault(_rcUpload);
	
	var _uploadList = __webpack_require__(621);
	
	var _uploadList2 = _interopRequireDefault(_uploadList);
	
	var _getFileItem = __webpack_require__(626);
	
	var _getFileItem2 = _interopRequireDefault(_getFileItem);
	
	var _classnames = __webpack_require__(176);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var prefixCls = 'ant-upload';
	
	function noop() {}
	
	function T() {
	  return true;
	}
	
	// Fix IE file.status problem
	// via coping a new Object
	function fileToObject(file) {
	  return {
	    lastModified: file.lastModified,
	    lastModifiedDate: file.lastModifiedDate,
	    name: file.filename || file.name,
	    size: file.size,
	    type: file.type,
	    uid: file.uid,
	    response: file.response,
	    error: file.error,
	    percent: 0,
	    originFileObj: file
	  };
	}
	
	/**
	 * 生成Progress percent: 0.1 -> 0.98
	 *   - for ie
	 */
	function genPercentAdd() {
	  var k = 0.1;
	  var i = 0.01;
	  var end = 0.98;
	  return function (s) {
	    var start = s;
	    if (start >= end) {
	      return start;
	    }
	
	    start += k;
	    k = k - i;
	    if (k < 0.001) {
	      k = 0.001;
	    }
	    return start * 100;
	  };
	}
	
	function UploadDragger(props) {
	  return _react2["default"].createElement(Upload, _extends({}, props, { type: 'drag', style: { height: props.height } }));
	}
	
	var Upload = (_temp = _class = function (_React$Component) {
	  _inherits(Upload, _React$Component);
	
	  function Upload(props) {
	    _classCallCheck(this, Upload);
	
	    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));
	
	    _this.onStart = function (file) {
	      if (_this.recentUploadStatus === false) return;
	
	      var targetItem = void 0;
	      var nextFileList = _this.state.fileList.concat();
	      if (file.length > 0) {
	        targetItem = file.map(function (f) {
	          var fileObject = fileToObject(f);
	          fileObject.status = 'uploading';
	          return fileObject;
	        });
	        nextFileList = nextFileList.concat(targetItem);
	      } else {
	        targetItem = fileToObject(file);
	        targetItem.status = 'uploading';
	        nextFileList.push(targetItem);
	      }
	      _this.onChange({
	        file: targetItem,
	        fileList: nextFileList
	      });
	      // fix ie progress
	      if (!window.FormData) {
	        _this.autoUpdateProgress(0, targetItem);
	      }
	    };
	
	    _this.onSuccess = function (response, file) {
	      _this.clearProgressTimer();
	      try {
	        if (typeof response === 'string') {
	          response = JSON.parse(response);
	        }
	      } catch (e) {/* do nothing */}
	      var fileList = _this.state.fileList;
	      var targetItem = (0, _getFileItem2["default"])(file, fileList);
	      // 之前已经删除
	      if (targetItem) {
	        targetItem.status = 'done';
	        targetItem.response = response;
	        _this.onChange({
	          file: targetItem,
	          fileList: fileList
	        });
	      }
	    };
	
	    _this.onProgress = function (e, file) {
	      var fileList = _this.state.fileList;
	      var targetItem = (0, _getFileItem2["default"])(file, fileList);
	      if (!targetItem) return;
	      targetItem.percent = e.percent;
	      _this.onChange({
	        event: e,
	        file: targetItem,
	        fileList: _this.state.fileList
	      });
	    };
	
	    _this.onError = function (error, response, file) {
	      _this.clearProgressTimer();
	      var fileList = _this.state.fileList;
	      var targetItem = (0, _getFileItem2["default"])(file, fileList);
	      targetItem.error = error;
	      targetItem.response = response;
	      targetItem.status = 'error';
	      _this.handleRemove(targetItem);
	    };
	
	    _this.beforeUpload = function (file) {
	      _this.recentUploadStatus = _this.props.beforeUpload(file);
	      return _this.recentUploadStatus;
	    };
	
	    _this.handlePreview = function (file) {
	      if ('onPreview' in _this.props) {
	        _this.props.onPreview(file);
	      }
	    };
	
	    _this.handleManualRemove = function (file) {
	      /*eslint-disable */
	      file.status = 'removed';
	      /*eslint-enable */
	      if ('onRemove' in _this.props) {
	        _this.props.onRemove(file);
	      } else {
	        _this.handleRemove(file);
	      }
	    };
	
	    _this.onChange = function (info) {
	      _this.setState({
	        fileList: info.fileList
	      });
	      _this.props.onChange(info);
	    };
	
	    _this.onFileDrop = function (e) {
	      _this.setState({
	        dragState: e.type
	      });
	    };
	
	    _this.state = {
	      fileList: _this.props.fileList || _this.props.defaultFileList || [],
	      dragState: 'drop'
	    };
	    return _this;
	  }
	
	  Upload.prototype.autoUpdateProgress = function autoUpdateProgress(percent, file) {
	    var _this2 = this;
	
	    var getPercent = genPercentAdd();
	    var curPercent = 0;
	    this.progressTimer = setInterval(function () {
	      curPercent = getPercent(curPercent);
	      _this2.onProgress({
	        percent: curPercent
	      }, file);
	    }, 200);
	  };
	
	  Upload.prototype.removeFile = function removeFile(file) {
	    var fileList = this.state.fileList;
	    var targetItem = (0, _getFileItem2["default"])(file, fileList);
	    var index = fileList.indexOf(targetItem);
	    if (index !== -1) {
	      fileList.splice(index, 1);
	      return fileList;
	    }
	    return null;
	  };
	
	  Upload.prototype.handleRemove = function handleRemove(file) {
	    var fileList = this.removeFile(file);
	    if (fileList) {
	      this.onChange({
	        file: file,
	        fileList: fileList
	      });
	    }
	  };
	
	  Upload.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    if ('fileList' in nextProps) {
	      this.setState({
	        fileList: nextProps.fileList || []
	      });
	    }
	  };
	
	  Upload.prototype.clearProgressTimer = function clearProgressTimer() {
	    clearInterval(this.progressTimer);
	  };
	
	  Upload.prototype.render = function render() {
	    var _classNames;
	
	    var type = this.props.type || 'select';
	    var props = _extends({}, this.props, {
	      onStart: this.onStart,
	      onError: this.onError,
	      onProgress: this.onProgress,
	      onSuccess: this.onSuccess,
	      beforeUpload: this.beforeUpload
	    });
	    var uploadList = void 0;
	    if (this.props.showUploadList) {
	      uploadList = _react2["default"].createElement(_uploadList2["default"], { listType: this.props.listType,
	        items: this.state.fileList,
	        onPreview: this.handlePreview,
	        onRemove: this.handleManualRemove });
	    }
	    if (type === 'drag') {
	      var dragUploadingClass = this.state.fileList.some(function (file) {
	        return file.status === 'uploading';
	      }) ? prefixCls + '-drag-uploading' : '';
	      var draggingClass = this.state.dragState === 'dragover' ? prefixCls + '-drag-hover' : '';
	      return _react2["default"].createElement(
	        'span',
	        { className: this.props.className },
	        _react2["default"].createElement(
	          'div',
	          { className: prefixCls + ' ' + prefixCls + '-drag ' + dragUploadingClass + ' ' + draggingClass,
	            onDrop: this.onFileDrop,
	            onDragOver: this.onFileDrop,
	            onDragLeave: this.onFileDrop },
	          _react2["default"].createElement(
	            _rcUpload2["default"],
	            props,
	            _react2["default"].createElement(
	              'div',
	              { className: prefixCls + '-drag-container' },
	              this.props.children
	            )
	          )
	        ),
	        uploadList
	      );
	    }
	
	    var uploadButtonCls = (0, _classnames2["default"])((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, prefixCls + '-select', true), _defineProperty(_classNames, prefixCls + '-select-' + this.props.listType, true), _classNames));
	
	    var uploadButton = this.props.children ? _react2["default"].createElement(
	      'div',
	      { className: uploadButtonCls },
	      _react2["default"].createElement(_rcUpload2["default"], props)
	    ) : null;
	
	    if (this.props.listType === 'picture-card') {
	      return _react2["default"].createElement(
	        'span',
	        { className: this.props.className },
	        uploadList,
	        uploadButton
	      );
	    }
	
	    return _react2["default"].createElement(
	      'span',
	      { className: this.props.className },
	      uploadButton,
	      uploadList
	    );
	  };
	
	  return Upload;
	}(_react2["default"].Component), _class.Dragger = UploadDragger, _class.defaultProps = {
	  type: 'select',
	  // do not set
	  // name: '',
	  multiple: false,
	  action: '',
	  data: {},
	  accept: '',
	  onChange: noop,
	  beforeUpload: T,
	  showUploadList: true,
	  listType: 'text', // or pictrue
	  className: ''
	}, _temp);
	exports["default"] = Upload;
	module.exports = exports['default'];

/***/ },

/***/ 615:
/***/ function(module, exports, __webpack_require__) {

	// export this package's api
	'use strict';
	
	module.exports = __webpack_require__(616);

/***/ },

/***/ 616:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _AjaxUploader = __webpack_require__(617);
	
	var _AjaxUploader2 = _interopRequireDefault(_AjaxUploader);
	
	var _IframeUploader = __webpack_require__(620);
	
	var _IframeUploader2 = _interopRequireDefault(_IframeUploader);
	
	function empty() {}
	
	var Upload = _react2['default'].createClass({
	  displayName: 'Upload',
	
	  propTypes: {
	    action: _react.PropTypes.string,
	    name: _react.PropTypes.string,
	    multipart: _react.PropTypes.bool,
	    onError: _react.PropTypes.func,
	    onSuccess: _react.PropTypes.func,
	    onProgress: _react.PropTypes.func,
	    onStart: _react.PropTypes.func,
	    data: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func]),
	    headers: _react.PropTypes.object,
	    accept: _react.PropTypes.string,
	    multiple: _react.PropTypes.bool,
	    beforeUpload: _react.PropTypes.func,
	    onReady: _react.PropTypes.func,
	    withCredentials: _react.PropTypes.bool,
	    supportServerRender: _react.PropTypes.bool
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      data: {},
	      headers: {},
	      name: 'file',
	      multipart: false,
	      onProgress: empty,
	      onReady: empty,
	      onStart: empty,
	      onError: empty,
	      onSuccess: empty,
	      supportServerRender: false,
	      multiple: false,
	      beforeUpload: null,
	      withCredentials: false
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      Component: null
	    };
	  },
	
	  componentDidMount: function componentDidMount() {
	    if (this.props.supportServerRender) {
	      /* eslint react/no-did-mount-set-state:0 */
	      this.setState({
	        Component: this.getComponent()
	      }, this.props.onReady);
	    }
	  },
	  getComponent: function getComponent() {
	    return typeof FormData !== 'undefined' ? _AjaxUploader2['default'] : _IframeUploader2['default'];
	  },
	
	  render: function render() {
	    if (this.props.supportServerRender) {
	      var _Component = this.state.Component;
	
	      if (_Component) {
	        return _react2['default'].createElement(_Component, this.props);
	      }
	      return null;
	    }
	    var Component = this.getComponent();
	    return _react2['default'].createElement(Component, this.props);
	  }
	});
	
	exports['default'] = Upload;
	module.exports = exports['default'];

/***/ },

/***/ 617:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _request = __webpack_require__(618);
	
	var _request2 = _interopRequireDefault(_request);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _uid = __webpack_require__(619);
	
	var _uid2 = _interopRequireDefault(_uid);
	
	var AjaxUploader = _react2['default'].createClass({
	  displayName: 'AjaxUploader',
	
	  propTypes: {
	    multiple: _react.PropTypes.bool,
	    onStart: _react.PropTypes.func,
	    data: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func]),
	    headers: _react.PropTypes.object,
	    beforeUpload: _react.PropTypes.func,
	    withCredentials: _react.PropTypes.bool
	  },
	
	  onChange: function onChange(e) {
	    var files = e.target.files;
	    this.uploadFiles(files);
	  },
	
	  onClick: function onClick() {
	    var el = this.refs.file;
	    if (!el) {
	      return;
	    }
	    el.click();
	    el.value = '';
	  },
	
	  onKeyDown: function onKeyDown(e) {
	    if (e.key === 'Enter') {
	      this.onClick();
	    }
	  },
	
	  onFileDrop: function onFileDrop(e) {
	    if (e.type === 'dragover') {
	      return e.preventDefault();
	    }
	
	    var files = e.dataTransfer.files;
	    this.uploadFiles(files);
	
	    e.preventDefault();
	  },
	
	  uploadFiles: function uploadFiles(files) {
	    var len = files.length;
	    if (len > 0) {
	      for (var i = 0; i < len; i++) {
	        var file = files.item(i);
	        file.uid = (0, _uid2['default'])();
	        this.upload(file);
	      }
	      if (this.props.multiple) {
	        this.props.onStart(Array.prototype.slice.call(files));
	      } else {
	        this.props.onStart(Array.prototype.slice.call(files)[0]);
	      }
	    }
	  },
	
	  upload: function upload(file) {
	    var _this = this;
	
	    var props = this.props;
	    if (!props.beforeUpload) {
	      return this.post(file);
	    }
	
	    var before = props.beforeUpload(file);
	    if (before && before.then) {
	      before.then(function () {
	        _this.post(file);
	      });
	    } else if (before !== false) {
	      this.post(file);
	    }
	  },
	
	  post: function post(file) {
	    var props = this.props;
	    var data = props.data;
	    if (typeof data === 'function') {
	      data = data(file);
	    }
	
	    (0, _request2['default'])({
	      action: props.action,
	      filename: props.name,
	      file: file,
	      data: data,
	      headers: props.headers,
	      withCredentials: props.withCredentials,
	      onProgress: function onProgress(e) {
	        props.onProgress(e, file);
	      },
	      onSuccess: function onSuccess(ret) {
	        props.onSuccess(ret, file);
	      },
	      onError: function onError(err, ret) {
	        props.onError(err, ret, file);
	      }
	    });
	  },
	
	  render: function render() {
	    var hidden = { display: 'none' };
	    var props = this.props;
	    return _react2['default'].createElement(
	      'span',
	      {
	        onClick: this.onClick,
	        onKeyDown: this.onKeyDown,
	        onDrop: this.onFileDrop,
	        onDragOver: this.onFileDrop,
	        role: 'button',
	        tabIndex: '0'
	      },
	      _react2['default'].createElement('input', { type: 'file',
	        ref: 'file',
	        style: hidden,
	        accept: props.accept,
	        multiple: this.props.multiple,
	        onChange: this.onChange }),
	      props.children
	    );
	  }
	});
	
	exports['default'] = AjaxUploader;
	module.exports = exports['default'];

/***/ },

/***/ 618:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = upload;
	function getError(option, xhr) {
	  var msg = 'cannot post ' + option.action + ' ' + xhr.status + '\'';
	  var err = new Error(msg);
	  err.status = xhr.status;
	  err.method = 'post';
	  err.url = option.action;
	  return err;
	}
	
	function getBody(xhr) {
	  var text = xhr.responseText || xhr.response;
	  if (!text) {
	    return text;
	  }
	
	  try {
	    return JSON.parse(text);
	  } catch (e) {
	    return text;
	  }
	}
	
	// option {
	//  onProgress: (event: { percent: number }): void,
	//  onError: (event: Error, body?: Object): void,
	//  onSuccess: (body: Object): void,
	//  data: Object,
	//  filename: String,
	//  file: File,
	//  withCredentials: Boolean,
	//  action: String,
	//  headers: Object,
	// }
	
	function upload(option) {
	  if (typeof XMLHttpRequest === 'undefined') {
	    return;
	  }
	
	  var xhr = new XMLHttpRequest();
	  if (xhr.upload) {
	    xhr.upload.onprogress = function progress(e) {
	      if (e.total > 0) {
	        e.percent = e.loaded / e.total * 100;
	      }
	      option.onProgress(e);
	    };
	  }
	
	  var formData = new FormData();
	
	  if (option.data) {
	    Object.keys(option.data).map(function (key) {
	      formData.append(key, option.data[key]);
	    });
	  }
	
	  formData.append(option.filename, option.file);
	
	  xhr.onerror = function error(e) {
	    option.onError(e);
	  };
	
	  xhr.onload = function onload() {
	    // allow success when 2xx status
	    // see https://github.com/react-component/upload/issues/34
	    if (xhr.status < 200 || xhr.status >= 300) {
	      return option.onError(getError(option, xhr), getBody(xhr));
	    }
	
	    option.onSuccess(getBody(xhr));
	  };
	
	  xhr.open('post', option.action, true);
	
	  // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
	  if (option.withCredentials && 'withCredentials' in xhr) {
	    xhr.withCredentials = true;
	  }
	
	  var headers = option.headers || {};
	
	  // when set headers['X-Requested-With'] = null , can close default XHR header
	  // see https://github.com/react-component/upload/issues/33
	  if (headers['X-Requested-With'] !== null) {
	    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	  }
	
	  for (var h in headers) {
	    if (headers.hasOwnProperty(h) && headers[h] !== null) {
	      xhr.setRequestHeader(h, headers[h]);
	    }
	  }
	  xhr.send(formData);
	}
	
	module.exports = exports['default'];

/***/ },

/***/ 619:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = uid;
	var now = +new Date();
	var index = 0;
	
	function uid() {
	  return 'rc-upload-' + now + '-' + ++index;
	}
	
	module.exports = exports['default'];

/***/ },

/***/ 620:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(39);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _uid = __webpack_require__(619);
	
	var _uid2 = _interopRequireDefault(_uid);
	
	var _warning = __webpack_require__(285);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var iframeStyle = {
	  position: 'absolute',
	  top: 0,
	  opacity: 0,
	  filter: 'alpha(opacity=0)',
	  left: 0,
	  zIndex: 9999
	};
	var IframeUploader = _react2['default'].createClass({
	  displayName: 'IframeUploader',
	
	  propTypes: {
	    onStart: _react.PropTypes.func,
	    multiple: _react.PropTypes.bool,
	    children: _react.PropTypes.any,
	    data: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func]),
	    action: _react.PropTypes.string,
	    name: _react.PropTypes.string
	  },
	
	  componentDidMount: function componentDidMount() {
	    this.updateIframeWH();
	    this.initIframe();
	  },
	
	  componentDidUpdate: function componentDidUpdate() {
	    this.updateIframeWH();
	  },
	
	  onLoad: function onLoad() {
	    if (!this.loading) {
	      return;
	    }
	    var props = this.props;
	    var response = undefined;
	    var eventFile = this.file;
	    try {
	      var doc = this.getIframeDocument();
	      var script = doc.getElementsByTagName('script')[0];
	      if (script && script.parentNode === doc.body) {
	        doc.body.removeChild(script);
	      }
	      response = doc.body.innerHTML;
	      props.onSuccess(response, eventFile);
	    } catch (err) {
	      (0, _warning2['default'])(false, 'cross domain error for Upload. Maybe server should return document.domain script. see Note from https://github.com/react-component/upload');
	      response = 'cross-domain';
	      props.onError(err, null, eventFile);
	    }
	    this.enableIframe();
	    this.initIframe();
	  },
	
	  onChange: function onChange() {
	    var target = this.getFormInputNode();
	    // ie8/9 don't support FileList Object
	    // http://stackoverflow.com/questions/12830058/ie8-input-type-file-get-files
	    var file = this.file = {
	      uid: (0, _uid2['default'])(),
	      name: target.value
	    };
	    this.props.onStart(this.getFileForMultiple(file));
	    var formNode = this.getFormNode();
	    var dataSpan = this.getFormDataNode();
	    var data = this.props.data;
	    if (typeof data === 'function') {
	      data = data(file);
	    }
	    var inputs = [];
	    for (var key in data) {
	      if (data.hasOwnProperty(key)) {
	        inputs.push('<input name="' + key + '" value="' + data[key] + '"/>');
	      }
	    }
	    dataSpan.innerHTML = inputs.join('');
	    formNode.submit();
	    dataSpan.innerHTML = '';
	    this.disabledIframe();
	  },
	
	  getIframeNode: function getIframeNode() {
	    return this.refs.iframe;
	  },
	
	  getIframeDocument: function getIframeDocument() {
	    return this.getIframeNode().contentDocument;
	  },
	
	  getFormNode: function getFormNode() {
	    return this.getIframeDocument().getElementById('form');
	  },
	
	  getFormInputNode: function getFormInputNode() {
	    return this.getIframeDocument().getElementById('input');
	  },
	
	  getFormDataNode: function getFormDataNode() {
	    return this.getIframeDocument().getElementById('data');
	  },
	
	  getFileForMultiple: function getFileForMultiple(file) {
	    return this.props.multiple ? [file] : file;
	  },
	
	  getIframeHTML: function getIframeHTML(domain) {
	    var domainScript = '';
	    var domainInput = '';
	    if (domain) {
	      domainScript = '<script>document.domain="' + domain + '";</script>';
	      domainInput = '<input name="_documentDomain" value="' + domain + '" />';
	    }
	    return '\n    <!DOCTYPE html>\n    <html>\n    <head>\n    <meta http-equiv="X-UA-Compatible" content="IE=edge" />\n    <style>\n    body,html {padding:0;margin:0;border:0;overflow:hidden;}\n    </style>\n    ' + domainScript + '\n    </head>\n    <body>\n    <form method="post"\n    encType="multipart/form-data"\n    action="' + this.props.action + '" id="form" style="display:block;height:9999px;position:relative;overflow:hidden;">\n    <input id="input" type="file"\n     name="' + this.props.name + '"\n     style="position:absolute;top:0;right:0;height:9999px;font-size:9999px;cursor:pointer;"/>\n    ' + domainInput + '\n    <span id="data"></span>\n    </form>\n    </body>\n    </html>\n    ';
	  },
	
	  initIframeSrc: function initIframeSrc() {
	    if (this.domain) {
	      this.getIframeNode().src = 'javascript:void((function(){\n        var d = document;\n        d.open();\n        d.domain=\'' + this.domain + '\';\n        d.write(\'\');\n        d.close();\n      })())';
	    }
	  },
	
	  initIframe: function initIframe() {
	    var iframeNode = this.getIframeNode();
	    var win = iframeNode.contentWindow;
	    var doc = undefined;
	    this.domain = this.domain || '';
	    this.initIframeSrc();
	    try {
	      doc = win.document;
	    } catch (e) {
	      this.domain = document.domain;
	      this.initIframeSrc();
	      win = iframeNode.contentWindow;
	      doc = win.document;
	    }
	    doc.open('text/html', 'replace');
	    doc.write(this.getIframeHTML(this.domain));
	    doc.close();
	    this.getFormInputNode().onchange = this.onChange;
	  },
	
	  enableIframe: function enableIframe() {
	    this.loading = false;
	    this.getIframeNode().style.display = '';
	  },
	
	  disabledIframe: function disabledIframe() {
	    this.loading = true;
	    this.getIframeNode().style.display = 'none';
	  },
	
	  updateIframeWH: function updateIframeWH() {
	    var rootNode = _reactDom2['default'].findDOMNode(this);
	    var iframeNode = this.getIframeNode();
	    iframeNode.style.height = rootNode.offsetHeight + 'px';
	    iframeNode.style.width = rootNode.offsetWidth + 'px';
	  },
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'span',
	      { style: { position: 'relative', zIndex: 0 } },
	      _react2['default'].createElement('iframe', { ref: 'iframe',
	        onLoad: this.onLoad,
	        style: iframeStyle }),
	      this.props.children
	    );
	  }
	});
	
	exports['default'] = IframeUploader;
	module.exports = exports['default'];

/***/ },

/***/ 621:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _class, _temp2;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _rcAnimate = __webpack_require__(226);
	
	var _rcAnimate2 = _interopRequireDefault(_rcAnimate);
	
	var _icon = __webpack_require__(177);
	
	var _icon2 = _interopRequireDefault(_icon);
	
	var _progress = __webpack_require__(622);
	
	var _progress2 = _interopRequireDefault(_progress);
	
	var _classnames = __webpack_require__(176);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var prefixCls = 'ant-upload';
	
	
	// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
	var previewFile = function previewFile(file, callback) {
	  var reader = new FileReader();
	  reader.onloadend = function () {
	    return callback(reader.result);
	  };
	  reader.readAsDataURL(file);
	};
	
	var UploadList = (_temp2 = _class = function (_React$Component) {
	  _inherits(UploadList, _React$Component);
	
	  function UploadList() {
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, UploadList);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleClose = function (file) {
	      _this.props.onRemove(file);
	    }, _this.handlePreview = function (file, e) {
	      e.preventDefault();
	      return _this.props.onPreview(file);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  UploadList.prototype.componentDidUpdate = function componentDidUpdate() {
	    var _this2 = this;
	
	    if (this.props.listType !== 'picture' && this.props.listType !== 'picture-card') {
	      return;
	    }
	    this.props.items.forEach(function (file) {
	      if (typeof document === 'undefined' || typeof window === 'undefined' || !window.FileReader || !window.File || !(file.originFileObj instanceof File) || file.thumbUrl !== undefined) {
	        return;
	      }
	      /*eslint-disable */
	      file.thumbUrl = '';
	      /*eslint-enable */
	      previewFile(file.originFileObj, function (previewDataUrl) {
	        /*eslint-disable */
	        file.thumbUrl = previewDataUrl;
	        /*eslint-enable */
	        _this2.forceUpdate();
	      });
	    });
	  };
	
	  UploadList.prototype.render = function render() {
	    var _this3 = this,
	        _classNames2;
	
	    var list = this.props.items.map(function (file) {
	      var _classNames;
	
	      var progress = void 0;
	      var icon = _react2["default"].createElement(_icon2["default"], { type: 'paper-clip' });
	
	      if (_this3.props.listType === 'picture' || _this3.props.listType === 'picture-card') {
	        if (file.status === 'uploading' || !file.thumbUrl && !file.url) {
	          if (_this3.props.listType === 'picture-card') {
	            icon = _react2["default"].createElement(
	              'div',
	              { className: prefixCls + '-list-item-uploading-text' },
	              '文件上传中'
	            );
	          } else {
	            icon = _react2["default"].createElement(_icon2["default"], { className: prefixCls + '-list-item-thumbnail', type: 'picture' });
	          }
	        } else {
	          icon = _react2["default"].createElement(
	            'a',
	            {
	              className: prefixCls + '-list-item-thumbnail',
	              onClick: function onClick(e) {
	                return _this3.handlePreview(file, e);
	              },
	              href: file.url,
	              target: '_blank' },
	            _react2["default"].createElement('img', { src: file.thumbUrl || file.url, alt: file.name })
	          );
	        }
	      }
	
	      if (file.status === 'uploading') {
	        progress = _react2["default"].createElement(
	          'div',
	          { className: prefixCls + '-list-item-progress' },
	          _react2["default"].createElement(_progress2["default"], _extends({ type: 'line' }, _this3.props.progressAttr, { percent: file.percent }))
	        );
	      }
	      var infoUploadingClass = (0, _classnames2["default"])((_classNames = {}, _defineProperty(_classNames, prefixCls + '-list-item', true), _defineProperty(_classNames, prefixCls + '-list-item-' + file.status, true), _classNames));
	      return _react2["default"].createElement(
	        'div',
	        { className: infoUploadingClass, key: file.uid },
	        _react2["default"].createElement(
	          'div',
	          { className: prefixCls + '-list-item-info' },
	          icon,
	          file.url ? _react2["default"].createElement(
	            'a',
	            {
	              onClick: function onClick(e) {
	                return _this3.handlePreview(file, e);
	              },
	              href: file.url, target: '_blank',
	              className: prefixCls + '-list-item-name' },
	            file.name
	          ) : _react2["default"].createElement(
	            'span',
	            { className: prefixCls + '-list-item-name' },
	            file.name
	          ),
	          _this3.props.listType === 'picture-card' && file.status !== 'uploading' ? _react2["default"].createElement(
	            'span',
	            null,
	            _react2["default"].createElement(
	              'a',
	              {
	                onClick: function onClick(e) {
	                  return _this3.handlePreview(file, e);
	                },
	                href: file.url,
	                target: '_blank',
	                style: { pointerEvents: file.url ? '' : 'none' } },
	              _react2["default"].createElement(_icon2["default"], { type: 'eye-o' })
	            ),
	            _react2["default"].createElement(_icon2["default"], { type: 'delete', onClick: function onClick() {
	                return _this3.handleClose(file);
	              } })
	          ) : _react2["default"].createElement(_icon2["default"], { type: 'cross', onClick: function onClick() {
	              return _this3.handleClose(file);
	            } })
	        ),
	        progress
	      );
	    });
	    var listClassNames = (0, _classnames2["default"])((_classNames2 = {}, _defineProperty(_classNames2, prefixCls + '-list', true), _defineProperty(_classNames2, prefixCls + '-list-' + this.props.listType, true), _classNames2));
	    return _react2["default"].createElement(
	      'div',
	      { className: listClassNames },
	      _react2["default"].createElement(
	        _rcAnimate2["default"],
	        { transitionName: prefixCls + '-margin-top' },
	        list
	      )
	    );
	  };
	
	  return UploadList;
	}(_react2["default"].Component), _class.defaultProps = {
	  listType: 'text', // or picture
	  items: [],
	  progressAttr: {
	    strokeWidth: 3,
	    showInfo: false
	  }
	}, _temp2);
	exports["default"] = UploadList;
	module.exports = exports['default'];

/***/ },

/***/ 622:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _progress = __webpack_require__(623);
	
	var _progress2 = _interopRequireDefault(_progress);
	
	var _warning = __webpack_require__(285);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var AntProgress = _progress2["default"];
	
	// For downward compatibility
	AntProgress.Line = function (props) {
	  (0, _warning2["default"])(false, '<Progress.Line /> is deprecated, use <Progress type="line" /> instead.');
	  return _react2["default"].createElement(_progress2["default"], _extends({}, props, { type: 'line' }));
	};
	AntProgress.Circle = function (props) {
	  (0, _warning2["default"])(false, '<Progress.Circle /> is deprecated, use <Progress type="circle" /> instead.');
	  return _react2["default"].createElement(_progress2["default"], _extends({}, props, { type: 'circle' }));
	};
	
	exports["default"] = AntProgress;
	module.exports = exports['default'];

/***/ },

/***/ 623:
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
	
	var _icon = __webpack_require__(177);
	
	var _icon2 = _interopRequireDefault(_icon);
	
	var _rcProgress = __webpack_require__(624);
	
	var _classnames = __webpack_require__(176);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var statusColorMap = {
	  normal: '#2db7f5',
	  exception: '#ff5500',
	  success: '#87d068'
	};
	
	var Line = (_temp = _class = function (_React$Component) {
	  _inherits(Line, _React$Component);
	
	  function Line() {
	    _classCallCheck(this, Line);
	
	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }
	
	  Line.prototype.render = function render() {
	    var _classNames;
	
	    var _props = this.props;
	    var prefixCls = _props.prefixCls;
	    var status = _props.status;
	    var format = _props.format;
	    var percent = _props.percent;
	    var trailColor = _props.trailColor;
	    var type = _props.type;
	    var strokeWidth = _props.strokeWidth;
	    var width = _props.width;
	    var className = _props.className;
	    var showInfo = _props.showInfo;
	
	    var restProps = _objectWithoutProperties(_props, ['prefixCls', 'status', 'format', 'percent', 'trailColor', 'type', 'strokeWidth', 'width', 'className', 'showInfo']);
	
	    var progressStatus = parseInt(percent, 10) >= 100 && !('status' in this.props) ? 'success' : status || 'normal';
	    var progressInfo = void 0;
	    var progress = void 0;
	    var textFormatter = format || function (percentNumber) {
	      return percentNumber + '%';
	    };
	
	    if (showInfo) {
	      var text = void 0;
	      var iconType = type === 'circle' ? '' : '-circle';
	      if (progressStatus === 'exception') {
	        text = format ? textFormatter(percent) : _react2["default"].createElement(_icon2["default"], { type: 'cross' + iconType });
	      } else if (progressStatus === 'success') {
	        text = format ? textFormatter(percent) : _react2["default"].createElement(_icon2["default"], { type: 'check' + iconType });
	      } else {
	        text = textFormatter(percent);
	      }
	      progressInfo = _react2["default"].createElement(
	        'span',
	        { className: prefixCls + '-text' },
	        text
	      );
	    }
	
	    if (type === 'line') {
	      var percentStyle = {
	        width: percent + '%',
	        height: strokeWidth || 10
	      };
	      progress = _react2["default"].createElement(
	        'div',
	        null,
	        _react2["default"].createElement(
	          'div',
	          { className: prefixCls + '-outer' },
	          _react2["default"].createElement(
	            'div',
	            { className: prefixCls + '-inner' },
	            _react2["default"].createElement('div', { className: prefixCls + '-bg', style: percentStyle })
	          )
	        ),
	        progressInfo
	      );
	    } else if (type === 'circle') {
	      var circleSize = width || 132;
	      var circleStyle = {
	        width: circleSize,
	        height: circleSize,
	        fontSize: circleSize * 0.16 + 6
	      };
	      progress = _react2["default"].createElement(
	        'div',
	        { className: prefixCls + '-inner', style: circleStyle },
	        _react2["default"].createElement(_rcProgress.Circle, { percent: percent, strokeWidth: strokeWidth || 6,
	          strokeColor: statusColorMap[progressStatus], trailColor: trailColor }),
	        progressInfo
	      );
	    }
	
	    var classString = (0, _classnames2["default"])((_classNames = {}, _defineProperty(_classNames, '' + prefixCls, true), _defineProperty(_classNames, prefixCls + '-' + type, true), _defineProperty(_classNames, prefixCls + '-status-' + progressStatus, true), _defineProperty(_classNames, prefixCls + '-show-info', showInfo), _defineProperty(_classNames, className, !!className), _classNames));
	
	    return _react2["default"].createElement(
	      'div',
	      _extends({}, restProps, { className: classString }),
	      progress
	    );
	  };
	
	  return Line;
	}(_react2["default"].Component), _class.defaultProps = {
	  type: 'line',
	  percent: 0,
	  showInfo: true,
	  trailColor: '#f3f3f3',
	  prefixCls: 'ant-progress'
	}, _class.propTypes = {
	  status: _react.PropTypes.oneOf(['normal', 'exception', 'active', 'success']),
	  type: _react.PropTypes.oneOf(['line', 'circle']),
	  showInfo: _react.PropTypes.bool,
	  percent: _react.PropTypes.number,
	  width: _react.PropTypes.number,
	  strokeWidth: _react.PropTypes.number,
	  trailColor: _react.PropTypes.string,
	  format: _react.PropTypes.func
	}, _temp);
	exports["default"] = Line;
	module.exports = exports['default'];

/***/ },

/***/ 624:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(625);

/***/ },

/***/ 625:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var assign = __webpack_require__(5);
	var React = __webpack_require__(2);
	var defaultProps = {
	  strokeWidth: 1,
	  strokeColor: '#3FC7FA',
	  trailWidth: 1,
	  trailColor: '#D9D9D9'
	};
	
	var Line = React.createClass({
	  displayName: 'Line',
	
	  render: function render() {
	    var props = assign({}, this.props);
	    var pathStyle = {
	      'strokeDasharray': '100px, 100px',
	      'strokeDashoffset': 100 - props.percent + 'px',
	      'transition': 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s linear'
	    };
	
	    ['strokeWidth', 'strokeColor', 'trailWidth', 'trailColor'].forEach(function (item) {
	      if (item === 'trailWidth' && !props.trailWidth && props.strokeWidth) {
	        props.trailWidth = props.strokeWidth;
	        return;
	      }
	      if (item === 'strokeWidth' && props.strokeWidth && (!parseFloat(props.strokeWidth) || parseFloat(props.strokeWidth) > 100 || parseFloat(props.strokeWidth) < 0)) {
	        props[item] = defaultProps[item];
	        return;
	      }
	      if (!props[item]) {
	        props[item] = defaultProps[item];
	      }
	    });
	
	    var strokeWidth = props.strokeWidth;
	    var center = strokeWidth / 2;
	    var right = 100 - strokeWidth / 2;
	    var pathString = 'M ' + center + ',' + center + ' L ' + right + ',' + center;
	    var viewBoxString = '0 0 100 ' + strokeWidth;
	
	    return React.createElement(
	      'svg',
	      { className: "rc-progress-line", viewBox: viewBoxString, preserveAspectRatio: "none" },
	      React.createElement('path', { className: "rc-progress-line-trail", d: pathString, strokeLinecap: "round",
	        stroke: props.trailColor, strokeWidth: props.trailWidth, fillOpacity: "0" }),
	      React.createElement('path', { className: "rc-progress-line-path", d: pathString, strokeLinecap: "round",
	        stroke: props.strokeColor, strokeWidth: props.strokeWidth, fillOpacity: "0", style: pathStyle })
	    );
	  }
	});
	
	var Circle = React.createClass({
	  displayName: 'Circle',
	
	  render: function render() {
	    var props = assign({}, this.props);
	    var strokeWidth = props.strokeWidth;
	    var radius = 50 - strokeWidth / 2;
	    var pathString = 'M 50,50 m 0,-' + radius + '\n     a ' + radius + ',' + radius + ' 0 1 1 0,' + 2 * radius + '\n     a ' + radius + ',' + radius + ' 0 1 1 0,-' + 2 * radius;
	    var len = Math.PI * 2 * radius;
	    var pathStyle = {
	      'strokeDasharray': len + 'px ' + len + 'px',
	      'strokeDashoffset': (100 - props.percent) / 100 * len + 'px',
	      'transition': 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
	    };
	    ['strokeWidth', 'strokeColor', 'trailWidth', 'trailColor'].forEach(function (item) {
	      if (item === 'trailWidth' && !props.trailWidth && props.strokeWidth) {
	        props.trailWidth = props.strokeWidth;
	        return;
	      }
	      if (!props[item]) {
	        props[item] = defaultProps[item];
	      }
	    });
	
	    return React.createElement(
	      'svg',
	      { className: 'rc-progress-circle', viewBox: '0 0 100 100' },
	      React.createElement('path', { className: 'rc-progress-circle-trail', d: pathString, stroke: props.trailColor,
	        strokeWidth: props.trailWidth, fillOpacity: '0' }),
	      React.createElement('path', { className: 'rc-progress-circle-path', d: pathString, strokeLinecap: 'round',
	        stroke: props.strokeColor, strokeWidth: props.strokeWidth, fillOpacity: '0', style: pathStyle })
	    );
	  }
	});
	
	module.exports = {
	  Line: Line,
	  Circle: Circle
	};

/***/ },

/***/ 626:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = getFileItem;
	function getFileItem(file, fileList) {
	  var matchWay = !file.uid ? 'byName' : 'byUid';
	  var target = fileList.filter(function (item) {
	    if (matchWay === 'byName') {
	      return item.name === file.name;
	    }
	    return item.uid === file.uid;
	  })[0];
	  return target;
	}
	module.exports = exports['default'];

/***/ }

});
//# sourceMappingURL=upload.js.map