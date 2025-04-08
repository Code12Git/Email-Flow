const express = require('express');
const { flowController } = require('../controllers');
const { verifyToken } = require('../middleware/verifyToken');
const router = express.Router();

router.post('/',verifyToken,flowController.flow);


module.exports = router;