const postingService = require("../services/postingService");

const createPost = async (req, res) => {
  const { user_id, contents } = req.body;

  const post = await userService.createPost(user_id, contents);

  res.status(201).json({ message: "postCreated" });
};

const getPost = async (req, res) => {
  const post = await userService.getPost();

  res.status(200).json({ "data is": post });
};

const getUserPost = async (req, res) => {
  const post = await userService.getUserPost();

  res.status(200).json({ "data:": post });
};

const updatePost = async (req, res) => {
  const { newContents } = req.body;

  const updatedPost = await userService.updatePost(newContents);

  res.status(200).json({ "data:": updatedPost });
};

const deletePost = async (req, res) => {
  console.log("controller 1");
  const deletePost = await userService.deletePost();

  res.status(204).json({ message: "post deleted" });
  console.log("controller 2");
};

module.exports = {
  createPost,
  getPost,
  getUserPost,
  updatePost,
  deletePost,
};
