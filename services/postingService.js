const postingDao = require("../models/postingDao");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createPost = async (user_id, contents) => {
  const post = await userDao.createPost(user_id, contents);
  return post;
};

const getPost = async () => {
  const post = await userDao.getPost();
  return post;
};

const getUserPost = async () => {
  const post = await userDao.getPost();
  return post;
};

const updatePost = async (newContents) => {
  const updatedPost = await userDao.updatePost(newContents);
  return updatedPost;
};

const deletePost = async () => {
  console.log("service 1");
  const deletePost = await userDao.deletePost();
  console.log("service 2");
  return deletePost;
};

module.exports = {
  createPost,
  getPost,
  getUserPost,
  updatePost,
  deletePost,
};
