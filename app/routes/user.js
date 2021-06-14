const express = require("express");


const userController = require('../controllers/userController');
const userExists = require('../middlewares/verification');
const auth = require("../middlewares/auth")

const router = express.Router();

router.post("/register", userExists, userController.registerUser)
router.post("/logout", auth, userController.logoutUser)
router.post("/login", userController.loginUser)

module.exports = router;