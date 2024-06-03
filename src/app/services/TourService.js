const Tour = require("../models/Tour");
const bcrypt = require("bcryptjs");

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
          status: "OK",
          message: "The name of tour is already",
        });
      }

      const createdTour = await Tour.create({
        name,
        description,
      });

      if (createdTour) {
        resolve({
          status: "OK",
          code: 200,
          message: "successfully",
          data: createdTour,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateTour = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkTour = await Tour.findOne({
        _id: id,
      });

      // console.log('checkTour', checkTour);

      if (checkTour === null) {
        resolve({
          status: "OK",
          code: 200,
          message: "The tour is not defined",
        });
      }

      const updatedTour = await Tour.findByIdAndUpdate(id, data, {
        new: true,
      });

      resolve({
        status: "OK",
        code: 200,
        message: "Update tour successfully",
        data: updatedTour,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteTour = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkTour = await Tour.findOne({
        _id: id,
      });

      // console.log('checkTour', checkTour);

      if (checkTour === null) {
        resolve({
          status: "OK",
          code: 200,
          message: "The tour is not defined",
        });
      }

      await Tour.findByIdAndDelete(id);

      resolve({
        status: "OK",
        code: 200,
        message: "Delete touris successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsTour = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const tour = await Tour.findOne({
        _id: id,
      });

      if (tour === null) {
        resolve({
          status: "OK",
          code: 200,
          message: "The tour is not defined",
        });
      }

      resolve({
        status: "OK",
        code: 200,
        message: "Get details tour successfully",
        data: tour,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllTour = (limit, page) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalTour = await Tour.countDocuments();
      const allTour = await Tour.find()
        .limit(limit)
        .skip(page * limit);

      resolve({
        status: "OK",
        code: 200,
        message: "Get all user successfully",
        data: allTour,
        total: totalTour,
        pageCurrent: Number(page + 1),
        totalPages: Math.ceil(totalTour / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createTour,
  updateTour,
  getDetailsTour,
  deleteTour,
  getAllTour,
};
