const express = require("express");
const router = express.Router();

const toursController = require("../app/controllers/TourController");
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../app/middleware/authMiddleware");

router.post("/create", toursController.createTour);
router.put("/update/:id", toursController.updateTour);
router.get("/get-details/:id", toursController.getDetailsTour);
router.delete("/delete/:id", toursController.deleteTour);
router.get("/get-all", toursController.getAllTour);

// router.get('/create2', toursController.create);
// router.post('/store', toursController.store);
// router.get('/:slug', toursController.show);

module.exports = router;
