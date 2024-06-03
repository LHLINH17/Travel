const newRouter = require('./news');
const toursRouter = require('./tours');
const siteRouter = require('./site');
const userRouter = require('./user');

function route(app) {
    app.use('/api/user', userRouter);
    app.use('/api/tour', toursRouter);
    app.use('/news', newRouter);
    app.use('/tours', toursRouter);
    app.use('/', siteRouter);
}

module.exports = route;
