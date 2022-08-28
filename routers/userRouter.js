const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// Mission 3 유저 회원가입 하기
router.post("/signup", userController.createUser);
//Mission 6 유저 로그인하기
router.post("/login", userController.userLogin);

module.exports = router;
