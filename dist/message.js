webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(vueCommon, Vue) {'use strict';

	/**
	 * @Author: lancui
	 * @Date:   2016-06-22 14:06:00
	 * @Email:  lancui@superjia.com
	* @Last modified by:   lancui
	* @Last modified time: 2016-06-29 16:06:70
	 */

	var router = vueCommon.createRouter();
	router.map({
	  '/': {
	    name: 'index',
	    component: __webpack_require__(404),
	    subRoutes: {
	      message: {
	        name: 'message',
	        component: __webpack_require__(414)
	      }
	    }
	  }
	});

	document.getElementById('fete').innerHTML = '<router-view></router-view>';
	var app = Vue.extend();
	router.start(app, '#fete');

	__webpack_require__(419);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(2)))

/***/ },

/***/ 404:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(405)
	__vue_script__ = __webpack_require__(412)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] main_vue/index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(413)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-26178f03/index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 405:
49,

/***/ 412:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _top_nav = __webpack_require__(48);

	var _top_nav2 = _interopRequireDefault(_top_nav);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: {
	    TopNav: _top_nav2.default
	  },
	  data: function data() {
	    return {};
	  },

	  props: {},
	  ready: function ready() {},

	  methods: {}
	};
	// </script>
	//
	// <style lang="sass" rel="stylesheet/scss" type="text/css">
	//     @import './index.scss';
	//
	//     @-webkit-keyframes fadeInDown {
	//         0% {
	//             opacity: 0;
	//             -webkit-transform: translateY(-20px);
	//         }
	//         100% {
	//             opacity: 1;
	//             -webkit-transform: translateY(0);
	//         }
	//     }
	//     @keyframes fadeInDown {
	//         0% {
	//             opacity: 0;
	//             transform: translateY(-20px);
	//         }
	//         100% {
	//             opacity: 1;
	//             transform: translateY(0);
	//         }
	//     }
	//
	//     .fadeInDown-transition {
	//         -webkit-animation-duration: 1s;
	//         animation-duration: 1s;
	//         -webkit-animation-fill-mode: both;
	//         animation-fill-mode: both;
	//         -webkit-animation-name: fadeInDown;
	//         animation-name: fadeInDown;
	//     }
	//     .fadeInDown-enter {
	//         display: block;
	//     }
	//     .fadeInDown-leave {
	//         display: none;
	//     }
	//
	// </style>
	// <template>
	//   <header id="header">
	//     <top-nav></top-nav>
	//   </header>
	//   <router-view transition="fadeInDown"></router-view>
	// </template>
	//
	// <script type="text/babel">
	// require('../socket/client.js')

/***/ },

/***/ 413:
/***/ function(module, exports) {

	module.exports = "\n<header id=\"header\">\n  <top-nav></top-nav>\n</header>\n<router-view transition=\"fadeInDown\"></router-view>\n";

/***/ },

/***/ 414:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(415)
	__vue_script__ = __webpack_require__(417)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] message/message.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(418)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-79bcf02f/message.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 415:
49,

/***/ 417:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Vue, fetch) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _stringify = __webpack_require__(109);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// /* 消息列表 */
	// <template>
	//     <section id="main">
	//     <div class="msg-list">
	//         <table class="ui selectable celled table">
	//             <thead>
	//                 <tr>
	//                     <th width="20%">时间</th>
	//                     <th width="10%">用户名</th>
	//                     <th width="10%">平台</th>
	//                     <th width="10%">操作</th>
	//                     <th>描述</th>
	//                     <th style="width: 14%;">状态<button class="ui basic button all-read" @click="updateStatusBatch()"><i class="icon user"></i>全部已读</button>
	//                     <!-- <button class="ui basic button all-read" @click="addMsg">add</button></th> -->
	//                 </tr>
	//             </thead>
	//             <tbody>
	//                 <tr v-for="(index, item) in msgList" :class="item.status == 1 ? 'positive' : ''">
	//                     <td>{{item.createTime}}</td>
	//                     <td>{{item.userName}}</td>
	//                     <td>{{item.platform}}</td>
	//                     <td>{{item.action}}</td>
	//                     <td>{{item.actionDetail}}</td>
	//                     <td><span class='read-status' :class="{'read':item.status===1}" @click="updateStatus(item.id, index, item.status)">{{{item.status | msgStatus}}}</span></td>
	//                 </tr>
	//             </tbody>
	//         </table>
	//         <div class="ui modal small">
	//           <div class="header">Header</div>
	//         </div>
	//     </div>
	//     </section>
	// </template>
	//
	// <script type="text/babel">

	Vue.filter('msgStatus', function (value) {
	  return value === 1 ? '已读' : '未读';
	});
	var username = pageConfig.me.username;
	exports.default = {
	  data: function data() {
	    return {
	      msgList: []
	    };
	  },
	  ready: function ready() {
	    this.getMsgList();
	  },

	  methods: {
	    getMsgList: function getMsgList() {
	      var _this = this;

	      fetch('/message/messages', {
	        method: 'GET',
	        body: { userId: username }
	      }).then(function (res) {
	        _this.msgList = res.data;
	      });
	    },
	    updateStatus: function updateStatus(msgId, i, status) {
	      var _this2 = this;

	      if (status === 1) return;
	      fetch('/message/messages', {
	        method: 'PUT',
	        body: (0, _stringify2.default)({ userId: username, msgId: msgId })
	      }).then(function (res) {
	        _this2.msgList[i].status = 1;
	      });
	    },
	    updateStatusBatch: function updateStatusBatch() {
	      var _this3 = this;

	      // 全部已读
	      // $('.small.modal').modal('show');
	      if (confirm('确定要全部已读吗？')) {
	        fetch('/message/messages', {
	          method: 'PUT',
	          body: (0, _stringify2.default)({ userId: username, msgId: null })
	        }).then(function (res) {
	          _this3.msgList.forEach(function (item) {
	            item.status = 1;
	          });
	        });
	      }
	    },
	    addMsg: function addMsg() {
	      var _this4 = this;

	      var msg = { userName: 'lancui', msgType: '1', platform: 'api', platformId: '576b401056e121e6c9ef082b', action: 'add', actionDetail: '新增消息接口', createTime: new Date() };
	      fetch('/message/messages', {
	        method: 'POST',
	        body: (0, _stringify2.default)({ msgData: msg })
	      }).then(function (res) {
	        _this4.getMsgList();
	      });
	    }
	  }
	};
	// </script>
	//
	// <style lang="sass">
	//     .msg-list {
	//         .read-status {
	//             display: inline-block;
	//             border: solid 1px #E74C3C;
	//             background: #E74C3C;
	//             color: #fff;
	//             width: 44px;
	//             line-height: 20px;
	//             text-align: center;
	//             font-size: 12px;
	//             border-radius: 3px;
	//             cursor: pointer;
	//         }
	//         .read {
	//             border: solid 1px #1ABC9C;
	//             background: #1ABC9C;
	//             cursor: default;
	//         }
	//         .all-read {
	//             margin-left: 10px;
	//             font-size: 12px;
	//             padding: 5px 10px;
	//         }
	//     }
	// </style>
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(71)))

/***/ },

/***/ 418:
/***/ function(module, exports) {

	module.exports = "\n\n<section id=\"main\">\n<div class=\"msg-list\">\n    <table class=\"ui selectable celled table\">\n        <thead>\n            <tr>\n                <th width=\"20%\">时间</th>\n                <th width=\"10%\">用户名</th>\n                <th width=\"10%\">平台</th>\n                <th width=\"10%\">操作</th>\n                <th>描述</th>\n                <th style=\"width: 14%;\">状态<button class=\"ui basic button all-read\" @click=\"updateStatusBatch()\"><i class=\"icon user\"></i>全部已读</button>\n                <!-- <button class=\"ui basic button all-read\" @click=\"addMsg\">add</button></th> -->\n            </tr>\n        </thead>\n        <tbody>\n            <tr v-for=\"(index, item) in msgList\" :class=\"item.status == 1 ? 'positive' : ''\">\n                <td>{{item.createTime}}</td>\n                <td>{{item.userName}}</td>\n                <td>{{item.platform}}</td>\n                <td>{{item.action}}</td>\n                <td>{{item.actionDetail}}</td>\n                <td><span class='read-status' :class=\"{'read':item.status===1}\" @click=\"updateStatus(item.id, index, item.status)\">{{{item.status | msgStatus}}}</span></td>\n            </tr>\n        </tbody>\n    </table>\n    <div class=\"ui modal small\">\n      <div class=\"header\">Header</div>\n    </div>\n</div>\n</section>\n";

/***/ }

});