/**
 * Created by zyy on 15/6/26.
 * zhangyuyu@superjia.com
 */
import _ from 'underscore';

const RANDOMARRAY = [
  ..._.map(_.range(0, 26), item => String.fromCharCode(item + 'a'.charCodeAt(0))),
  ..._.map(_.range(0, 10), item => String.fromCharCode(item + '0'.charCodeAt(0))),
  ..._.map(_.range(0, 26), item => String.fromCharCode(item + 'A'.charCodeAt(0)))
];

var util = {
  genId(len = 6) {
    let result = '';
    const arrLen = RANDOMARRAY.length;
    while (len--) {
      result += RANDOMARRAY[_.random(0, arrLen)];
    }
    return result;
  },

  isEmail(v) {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(v);
  },

  isMobileNum(v) {
    return /^1[3|4|5|7|8]\d{9}$/.test(v);
  },

  isMobile(req) {
    var phoneReg = "\\b(ip(hone|od)|android|opera m(ob|in)i" + "|windows (phone|ce)|blackberry" + "|s(ymbian|eries60|amsung)|p(laybook|alm|rofile/midp" + "|laystation portable)|nokia|fennec|htc[-_]" + "|mobile|up.browser|[1-4][0-9]{2}x[1-4][0-9]{2})\\b"

    var tableReg = "\\b(ipad|tablet|(Nexus 7)|up.browser" + "|[1-4][0-9]{2}x[1-4][0-9]{2})\\b"

    var agent = req.header['user-agent'].toLowerCase()
    if (!agent)
      return false

    if (!!new RegExp(phoneReg, 'igm').exec(agent) || !!new RegExp(tableReg, 'igm').exec(agent)) {
      return true
    }
    return false
  },

  isWeixin(req) {
    var agent = req.header('USER-AGENT').toLowerCase()
    if (!agent)
      return false
    if (agent.match(/MicroMessenger/i) == 'micromessenger') {
      return true
    } else {
      return false
    }
  },

  //delta相差天数
  fromNow(delta) {
    var now = new Date()

    delta = delta || delta * 86400000

    return new Date(now.getFullYear(), now.getMonth(), now.getDay()) - delta;
  },

  formateDate(time, format) {
    var self = new Date(time);

    function padding(n, p) {
      if (n < 10) {
        return (p || '0') + n;
      }
      return n;
    }

    function repl(s, c) {
      switch (c) {
        case 'd':
          return padding(self.getDate());
        case 'e':
          return self.getDate();
        case 'u':
          return self.getDay() + 1;
        case 'w':
          return self.getDay();
        case 'm':
          return padding(self.getMonth() + 1);
        case 'C':
          return parseInt(self.getFullYear() / 20 - 1, 10);
        case 'y':
          return padding(self.getFullYear() % 100);
        case 'Y':
          return self.getFullYear();
        case 'H':
          return padding(self.getHours());
        case 'I':
          return padding(self.getHours() % 12);
        case 'l':
          return padding(self.getHours() % 12, ' ');
        case 'M':
          return padding(self.getMinutes());
        case 'p':
          return self.getHours() < 12 ? 'AM' : 'PM';
        case 'P':
          return self.getHours() < 12 ? 'am' : 'pm';
        case 'r':
          return util.formateDate(time, '%I:%M:%S %p');
        case 'R':
          return util.formateDate(time, '%H:%M');
        case 'S':
          return padding(self.getSeconds());
        case 'T':
          return util.formateDate(time, '%H:%M:%S');
        case 'D':
          return util.formateDate(time, '%m/%d/%Y');
        case 'F':
          return util.formateDate(time, '%Y-%m-%d');
        case 's':
          return parseInt(self.getTime() / 1000, 10);
        case 'x':
          return self.toLocaleDateString();
        case 'X':
          return self.toLocaleTimeString();
        case 'n':
          return '\n';
        case 't':
          return '\t';
        case '%':
          return '%';
        default:
          return self.strftime(c);
      }
      return c;
    }

    var ret = format.replace(/%(\w)/g, repl)
    return ret;
  },

  //react中是否展示
  showIf(condition, el, el1 = null) {
    return !!condition ? el : el1;
  },

  // sendMail: function(name, title){
  //     var transporter = nodemailer.createTransport();
  //     var users = [
  //         'enzoyang@superjia.com', // 杨恩朋
  //         'zhanshanqin@superjia.com', // 占善钦
  //         'baiwenhao.sh@superjia.com', // 白文浩
  //         'mengyue.sh@superjia.com', // 孟月
  //         'zhangyuyu@superjia.com', // 张玉玉
  //         'zhuxinyong.sh@superjia.com', // 朱信勇
  //         'liyaping@superjia.com', // 李亚平
  //         'yuqingyang.sh@superjia.com', // 于清洋
  //         'lancui@superjia.com' // 兰翠
  //     ]

  //     transporter.sendMail({
  //         from: 'mumtt621722@163.com',
  //         to: users.join(','),
  //         subject: '爱屋前端小屋有文章更新啦',
  //         html: name + ' 添加了一篇文章 <a href="http://fe.superjia.com"> '+title+' </a>'
  //     });
  // }

  Json2MockTree(data, key, result) {
    if (!result) {
      result = []
    }

    if (Array.isArray(data)) {
      // data is array
      let tmpForPush = {
        key: key,
        type: 'Array',
        mock: '',
        comment: ''
      }
      let children = []
      if (typeof data[0] === 'object') {
        util.Json2MockTree(data[0], null, children)
        tmpForPush.children = children
      }
      result.push(tmpForPush)
      return result
    } else if (typeof data === 'object') {
      // data is object
      let children = []
      for (let k in data) {
        if (key) {
          util.Json2MockTree(data[k], k, children)
        } else {
          util.Json2MockTree(data[k], k, result)
        }
      }
      if (key) {
        result.push({
          key: key,
          type: typeof data,
          mock: '',
          comment: '',
          children: children
        })
      }
      return result
    } else {
      // not object or array
      if (!key) {
        console.log('error: data is not in a json format!')
      } else {
        result.push({
          key: key,
          type: typeof data,
          mock: '',
          comment: ''
        })
      }
      return result
    }
  },

  mockTree2MockTemplate(data, result) {
    if (!result) {
      result = {}
    }

    if (Array.isArray(data)) {
      // data is array
      for (let i = data.length - 1; i >= 0; i--) {
        mockTree2MockTemplate(data[i], result)
      }
      return result
    } else if (typeof data === 'object' && data.key && data.dataType && data.mock) {
      let mockArr = data.mock.split(':')

      // if has children
      if (data.children) {
        let tmpChildren = null
        if (data.dataType === 'object') {
          // object
          tmpChildren = {}
          for (var i = data.children.length - 1; i >= 0; i--) {
            mockTree2MockTemplate(data.children[i], tmpChildren)
          }
        } else {
          // array
          tmpChildren = [{}]
          for (var i = data.children.length - 1; i >= 0; i--) {
            mockTree2MockTemplate(data.children[i], tmpChildren[0])
          }
        }
        result[`${data.key}${mockArr[0]}`] = tmpChildren
      } else {
        // has no children
        let value = mockArr[1]
        if (data.dataType === 'boolean') {
          value = (mockArr[1] === 'true')
        } else if (data.dataType === 'number') {
          value = parseFloat(mockArr[1])
        } else if (!mockArr[0] && value[0] === '/') {
          // regexp
          value = new RegExp(mockArr[1])
        }
        result[`${data.key}${mockArr[0]}`] = value
      }

      return result
    } else {
      console.log('mock tree data format error !')
    }
  }
}
export default util;
