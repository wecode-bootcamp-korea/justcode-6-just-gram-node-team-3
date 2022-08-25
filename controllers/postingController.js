const postingService = require("../services/postingService");

const createPost = async (req, res) => {
  const { user_id, contents } = req.body;

  const post = await postingService.createPost(user_id, contents);

  res.status(201).json({ message: "postCreated" });
  return post;
};

const getPost = async (req, res) => {
  const post = await postingService.getPost();

  res.status(200).json({ "data is": post });
};

const getUserPost = async (req, res) => {
  const post = await postingService.getUserPost();

  res.status(200).json({ "data:": post });
};

const updatePost = async (req, res) => {
  const { newContents } = req.body;

  const updatedPost = await postingService.updatePost(newContents);

  res.status(200).json({ "data:": updatedPost });
};

const deletePost = async (req, res) => {
  console.log("controller 1");
  const deletePost = await postingService.deletePost();

  res.status(204).json({ message: "post deleted" });
  console.log("controller 2");
  return deletePost;
};

module.exports = {
  createPost,
  getPost,
  getUserPost,
  updatePost,
  deletePost,
};
