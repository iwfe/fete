/**
* @Author: lancui
* @Date:   2016-06-24 15:06:00
* @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-06-24 15:06:75
*/

var wrap = require('co-monk');
var db = require('../common/db');
import sutil from '../common/sutil';

let messageRouter = (router) => {
    
    router.get('/message', sutil.login, function*(next) {
        yield sutil.render(this, {
            commonTag: 'vue',
            html: '',
            staticTag: 'api',
            noHeader: true
        });
    });

    // CURD for message
    var msgDao = wrap(db.get('message'));
    router.get('/messages', sutil.login, function* (next) {
        if (!this.parse.toUsers) {
            sutil.failed(this, 1003);
        }
        sutil.success(this, yield msgDao.find({toUsers: this.parse.toUsers}));
    });

};

module.exports = messageRouter;
