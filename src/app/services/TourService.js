const Tour = require('../models/Tour');
const bcrypt = require('bcryptjs');

var salt = bcrypt.genSaltSync(10);

const createTour = (newTour) => {
    return new Promise(async (resolve, reject) => {
        const { name, description } = newTour;
        try {
            const checkTour = await Tour.findOne({
                name: name,
            });
            if (checkTour !== null) {
                resolve({
                    status: 'OK',
                    message: 'The name of tour is already',
                });
            }

            const createdTour = await Tour.create({
                name,
                description,
            });

            if (createdTour) {
                resolve({
                    status: 'OK',
                    code: 200,
                    message: 'successfully',
                    data: createdTour,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createTour,
};
