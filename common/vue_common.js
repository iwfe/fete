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
