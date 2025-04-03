const express = require('express');
const { emailController } =  require('../controllers');
const {verifyData} = require('../middleware');
const { emailSchema } = require('../validation/emailValidation');
const router = express.Router();

router.post('/schedule-email', emailController.sendEmail);

module.exports = router;