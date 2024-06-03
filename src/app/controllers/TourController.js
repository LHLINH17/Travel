const Tour = require("../models/Tour");
const { mongooesToObject } = require("../../util/mongooes");

const TourService = require("../services/TourService");
const JwtService = require("../services/JwtService");

// class TourController {
//     // [GET] /tours/:slug
//     show(req, res, next) {
//         Tour.findOne({ slug: req.params.slug })
//         .then(tour => {
//             res.render('tours/show', { tour: mongooesToObject(tour)});
//         })
//         .catch(next);
//         // res.send('Tour Detail - ' + req.params.slug);
//     }

//     // [GET] /tours/create
//     create(req, res, next) {
//         res.render('tours/create');
//     }

//     // [POST] /tours/store
//     store(req, res, next) {
//         // res.json(req.body);

//         const tours = new Tour(req.body);
//         tours.save()
//             .then(() => res.redirect('/'))
//             .catch(error => {

//             });

//         // const formData = req.body;
//         // formData.password = hashPassword(formData.password);
//         // const tours = new Tour(formData);
//         // tours.save()
//         //     .then(() => res.redirect('/'))
//         //     .catch(error => {

//         //     });

//     }
// }

const createTour = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(200).json({
        status: "error",
        message: "The input is required",
      });
    }
    console.log("respone :", req.body);
    const response = await TourService.createTour(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

// module.exports = new TourController()

module.exports = {
  createTour,
};
ule.exports = new TourController()

module.exports = {
    createTour,
};
