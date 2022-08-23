const postDao = require("../model/postDao");

//게시글 추가
const createPost = async (user_id, contents, posting_id, image_url) => {
  const post = await postDao.createPost(
    user_id,
    contents,
    posting_id,
    image_url
  );
  return post;
};

//게시글 조회
const readPost = async () => {
  return await postDao.readPost();
};

//유저 게시글 조회
const readUserPost = async (userId) => {
  return await postDao.readUserPost(userId);
};

//게시글 수정
const editPost = async (id, newContents) => {
  return await postDao.editPost(id, newContents);
};

//게시글 삭제
const deletePost = async (postingId) => {
  return await postDao.deletePost(postingId);
};

module.exports = {
  createPost,
  readPost,
  editPost,
  readUserPost,
  deletePost,
};
