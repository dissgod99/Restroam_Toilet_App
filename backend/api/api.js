const express = require("express");

const usersRoutes = require('./routes/users');
const toiletsRoutes = require('./routes/toilets');

const router = express.Router();
router.use('/users', usersRoutes);
router.use('/toilets', toiletsRoutes);

module.exports = router;