const User = require('../models/User');
// const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService');
var salt = bcrypt.genSaltSync(10);

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser;
        try {
            const checkUser = await User.findOne({
                email: email,
            });
            if (checkUser !== null) {
                resolve({
                    status: 'OK',
                    message: 'The email is already',
                });
            }

            // const hash = bcrypt.hashSync("password", 10);
            const hash = bcrypt.hashSync('password', salt);
            console.log('hash :', hash);

            const createdUser = await User.create({
                name,
                email,
                password: hash,
                confirmPassword: hash,
                phone,
            });

            if (createdUser) {
                resolve({
                    status: 'OK',
                    code: 200,
                    message: 'successfully',
                    data: createdUser,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = userLogin;
        try {
            const checkUser = await User.findOne({
                email: email,
            });

            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    code: 200,
                    message: 'The email is not defined',
                });
            }

            const comparePassword = bcrypt.compareSync(
                password,
                checkUser.password,
            );
            console.log('Compare password: ', comparePassword);

            if (comparePassword) {
                resolve({
                    status: 'OK',
                    code: 200,
                    message: 'The password or user is incorrect',
                });
            }

            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            });

            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            });

            // console.log('Access token: ', access_token);

            resolve({
                status: 'OK',
                code: 200,
                message: 'successfully',
                access_token,
                refresh_token,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id,
            });

            console.log('checkUser', checkUser);

            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    code: 200,
                    message: 'The email is not defined',
                });
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, {
                new: true,
            });

            resolve({
                status: 'OK',
                code: 200,
                message: 'successfully',
                data: updatedUser,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        // console.log('userId', userId)
        try {
            const checkUser = await User.findOne({
                _id: id,
            });

            // console.log('checkUser', checkUser);

            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    code: 200,
                    message: 'The email is not defined',
                });
            }

            await User.findByIdAndDelete(id);

            resolve({
                status: 'OK',
                code: 200,
                message: 'Delete is successfully',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        // console.log('userId', userId)
        try {
            // const checkUser = await User.findOne({
            //     _id: id,
            // })
            // console.log('checkUser', checkUser);

            const allUser = await User.find();

            resolve({
                status: 'OK',
                code: 200,
                message: 'Get all user successfully',
                data: allUser,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id,
            });

            if (user === null) {
                resolve({
                    status: 'OK',
                    code: 200,
                    message: 'The email is not defined',
                });
            }

            resolve({
                status: 'OK',
                code: 200,
                message: 'Get Details successfully',
                data: user,
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
};
