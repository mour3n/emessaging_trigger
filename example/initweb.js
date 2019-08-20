var { runWeb, webApp } = require('../src/index');

runWeb({
    mysqlConfig: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'eqinfo',
        database: 'db_schedule'
    },
    taskRootPath: __dirname + '/task',
    port: 8017,
    oauthLogin: function () {
        var MOCK_USER;
        if (process.env.NODE_ENV === 'production') {} else {
            MOCK_USER = {
                LoginName: 'admin',
                ChineseName: 'admin'
            };
            webApp.use(function (req, res, next) {
                if (!res.locals) {res.locals = {};}
                res.locals.userInfo = MOCK_USER;
                next();
            });
        }
    }
});
