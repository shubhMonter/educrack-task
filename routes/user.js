const express = require('express');
const router = express.Router();
const UserController = require('../Controller/user');
 
router.post("/login",UserController.Login);
router.post("/register",UserController.Register);

module.exports= router;