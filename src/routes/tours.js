const express = require('express');
const router = express.Router();

const toursController = require('../app/controllers/TourController');
const {
    authMiddleWare,
    authUserMiddleWare,
} = require('../app/middleware/authMiddleware');

router.post('/create', toursController.createTour);

// router.get('/create2', toursController.create);
// router.post('/store', toursController.store);
// router.get('/:slug', toursController.show);

module.exports = router;
