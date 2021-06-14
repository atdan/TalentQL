const express = require("express");


const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');
const userExists = require('../middlewares/verification');
const requireLogin = require("../middlewares/requireLogin")

const router = express.Router();

router.post("/register", userExists, userController.registerUser)
router.post("/logout", requireLogin, userController.logoutUser)
router.post("/login", userController.loginUser)

module.exports = router;