const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();

//Mission 4-1.Create
router.post("/create", postController.createPost);

//Mission 4-2.Read
router.get("", postController.postingData);

//Mission 4-3.Read2
router.get("/user", postController.postingUserData);

// Mission 4-4 Update
router.patch("/update", postController.postingUpdate);

//Mission 4-5 Delete
router.delete("/delete", postController.postingDelete);

module.exports = router;
