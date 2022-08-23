const postService = require("../service/postService");

//게시글 추가
const createPost = async (req, res) => {
  const { user_id, contents, posting_id, image_url } = req.body;

  if (!image_url) {
    res.status(400).json({ massage: "이미지가 첨부되지 않았습니다." });
    return;
  }

  await postService.createPost(user_id, contents, posting_id, image_url);

  res.status(201).json({ massage: "postCreated" });
};

//게시글 조회
const readPost = async (req, res) => {
  const postings = await postService.readPost();
  res.status(200).json({ data: postings });
};

//유저 게시글 조회
const readUserPost = async (req, res) => {
  const { userId } = req.params;

  const userPostings = await postService.readUserPost(userId);

  res.status(200).json({ data: userPostings });
};

//게시글 수정
const editPost = async (req, res) => {
  const { id, newContents } = req.body;

  const newPostingData = await postService.editPost(id, newContents);

  res.status(200).json({ data: newPostingData });
};

//게시글 삭제
const deletePost = async (req, res) => {
  const { postingId } = req.params;
  await postService.deletePost(postingId);
  res.status(204).json({ message: "postingDeleted" });
};

module.exports = {
  createPost,
  readPost,
  editPost,
  readUserPost,
  deletePost,
};
