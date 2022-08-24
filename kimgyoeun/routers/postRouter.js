const express = require("express");
const postController = require("../controller/postController");

const router = express.Router();

//게시글 추가
router.post("", postController.createPost);

//게시글 조회
router.get("", postController.readPost);

//유저의 게시글 조회
//JSON.parse() 적용해야함
router.get("/:userId", postController.readUserPost);

//게시글 수정
//이미지url수정 기능 추가해야함
router.patch("", postController.editPost);

//게시글 삭제
router.delete("/:postingId", postController.deletePost);

module.exports = router;
