const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const genneralAccessToken = async (payload) => {
    console.log('payload: ', payload);
    const access_token = jwt.sign(
        {
            payload,
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: '30s' },
    );

    return access_token;
};

const genneralRefreshToken = async (payload) => {
    console.log('payload: ', payload);
    const refresh_token = jwt.sign(
        {
            payload,
        },
        process.env.REFRESH_TOKEN,
        { expiresIn: '365d' },
    );

    return refresh_token;
};

const refreshTokenJWTService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            console.log('Token : ', token);
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    resolve({
                        status: 'error',
                        message: 'The authenticated',
                    });
                }
                // console.log('user', user);
                const { payload } = user;
                const access_token = await genneralAccessToken({
                    id: payload.id,
                    isAdmin: payload.isAdmin,
                });
                console.log('access token', access_token);
                resolve({
                    status: 'OK',
                    message: 'Success',
                    code: 200,
                    access_token,
                });
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJWTService,
};
