const express = require('express');
const userRoutes = require('./userRoutes');
const flowRoutes = require('./flowRoutes')
const router = express.Router();

router.use('/user',userRoutes)
router.use('/flow',flowRoutes)
module.exports = router;