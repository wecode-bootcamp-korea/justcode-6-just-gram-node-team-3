const express = require("express");
const postingController = require("../controllers/postingController");

const router = express.Router();

router.post("/post", postingController.createPost);
router.get("/post", postingController.getPost);
router.get("/post/1", postingController.getUserPost);
router.patch("/post/1", postingController.updatePost);
router.delete("/post/1", postingController.deletePost);

module.exports = router;
