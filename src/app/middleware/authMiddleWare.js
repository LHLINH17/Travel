const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleWare = (req, res, next) => {
    console.log('check Token', req.headers.token);
    const token = req.headers.token.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authenticated user',
                status: 'ERROR',
            });
        }

        const { payload } = user;

        if (payload?.isAdmin) {
            console.log('true');
            next();
        } else {
            return res.status(404).json({
                message: 'The authenticated user',
                status: 'ERROR',
            });
        }
    });
};

const authUserMiddleWare = (req, res, next) => {
    console.log('check Token', req.headers.token);
    const token = req.headers.token.split(' ')[1];
    const userID = req.params.id;
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authenticated user',
                status: 'ERROR',
            });
        }

        const { payload } = user;

        if (payload?.isAdmin || payload?.id === userID) {
            console.log('true');
            next();
        } else {
            return res.status(404).json({
                message: 'The authenticated user',
                status: 'ERROR',
            });
        }
    });
};

module.exports = {
    authMiddleWare,
    authUserMiddleWare,
};
