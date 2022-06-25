const express = require("express");

const usersRoutes = require('./routes/users');
const toiletsRoutes = require('./routes/toilets');
const reviewsRoutes = require('./routes/reviews');
const reportsRoutes = require('./routes/reports');
const router = express.Router();
router.use('/users', usersRoutes);
router.use('/toilets', toiletsRoutes);
router.use('/reviews', reviewsRoutes);
router.use('/reports', reportsRoutes);

module.exports = router;