/**
* @Author: chenjiangsong
* @Date:   2016-07-01 16:07:00
* @Email:  chenjiangsong.sh@superjia.com
* @Last modified by:   chenjiangsong
* @Last modified time: 2016-07-05 21:07:82
*/

// vue 配置项目公共
Vue.use(VueRouter);

module.exports = {
    createRouter: function (params) {
        let defaultOpts = {
            history: true,
            saveScrollPosition: true
        };

        if (typeof params === 'string') {
            defaultOpts.root = params;
        } else if (typeof params === 'object') {
            defaultOpts = $.extend({}, defaultOpts, params);
        }

        return new VueRouter(defaultOpts);
    }
};
