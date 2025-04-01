const express = require("express");
const { userController } = require("../controllers");
const {verifyData} = require('../middleware');
const userSchema = require("../validation/userValidation");
const router = express.Router();

router.post("/register",verifyData(userSchema), userController.register);

router.post('/login',verifyData(userSchema), userController.login)


module.exports = router;
