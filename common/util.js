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
    genId(len) {
        let result = '';
        const arrLen = RANDOMARRAY.length;
        while(len--) {
            result += RANDOMARRAY[_.random(0,arrLen)];
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
}
export default util;
