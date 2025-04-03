const express = require('express');

const userRoutes = require('./userRoutes');
const emailRoutes = require('./emailRoutes')
const router = express.Router();

router.use('/user',userRoutes)
router.use('/email',emailRoutes)
module.exports = router;