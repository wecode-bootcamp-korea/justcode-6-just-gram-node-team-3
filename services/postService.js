const postDao = require("../models/postDao");

// Mission 4-1.Create ===================
const createPost = async (user_id, contents) => {
  return await postDao.createPost(user_id, contents);
};

// Mission 4-2.Read ===================
const postingData = async () => {
  return await postDao.postingData();
};

// Mission 4-3.Read2 ===================
const postingUserData = async (id) => {
  return await postDao.postingUserData(id);
};

// Mission 4-4.Update ===================
const postingUpdate = async (postingId, updateContent) => {
  return await postDao.postingUpdate(postingId, updateContent);
};

// Mission 4-5.Delete ===================
const postingDelete = async (id) => {
  return await postDao.postingDelete(id);
};

module.exports = {
  createPost,
  postingData,
  postingUserData,
  postingUpdate,
  postingDelete,
};
