const express = require("express");


const postController = require('../controllers/postController');

const cleanUserCache = require('../middlewares/cleanUserCache');

const auth = require("../middlewares/auth")

const router = express.Router();

router.post("/create", auth, cleanUserCache, postController.createPost)
router.delete("/delete/:id", auth, cleanUserCache, postController.deletePost)
router.put("/edit", auth, cleanUserCache, postController.editPost)
router.get("/all", auth, postController.getUserPosts)
router.get("/get/:id", auth, postController.getSinglePost)

module.exports = router