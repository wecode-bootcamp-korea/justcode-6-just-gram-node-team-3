const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

//회원가입
router.post("/signup", userController.createUser);

//로그인
router.post("/login", userController.loginUser);

module.exports = router;
