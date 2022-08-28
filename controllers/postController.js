const postService = require("../services/postService");

// Mission 4-1.Create ===================

const createPost = async (req, res) => {
  const { user_id, contents } = req.body;

  // 유효성검사
  if (!(user_id && contents)) {
    res.status(400).json({ message: "input error" });
    return;
  }

  try {
    const result = await postService.createPost(user_id, contents);
    // console.log("controller 2");
    res.status(201).json({ message: "postCreated" });
  } catch {
    console.log(err);
    res.status(500).json({ message: "postCreated Error" });
  }
};

// Mission 4-2.Read ===================
const postingData = async (req, res) => {
  try {
    const result = await postService.postingData();
    res.status(201).json({ message: result });
  } catch {
    res.status(500).json({ message: "postingData Error" });
  }
};

// Mission 4-3.Read2 ===================
const postingUserData = async (req, res) => {
  const { id } = req.query;
  try {
    const result = await postService.postingUserData(id);
    res.status(201).json({ message: result });
  } catch {
    res.status(500).json({ message: "postingUserData Error" });
  }
};

// Mission 4-4.Update ===================
const postingUpdate = async (req, res) => {
  const { postingId, updateContent } = req.body;
  if (!(postingId && updateContent)) {
    res.status(400).json({ message: "input error" });
    return;
  }
  try {
    const result = await postService.postingUpdate(postingId, updateContent);
    res.status(201).json({ message: result });
  } catch {
    res.status(500).json({ message: "postingUpdate Error" });
  }
};

// Mission 4-5.Delete ===================
const postingDelete = async (req, res) => {
  const { id } = req.query;
  try {
    const result = await postService.postingDelete(id);
    res.status(201).json({ message: "postingDeleted" });
  } catch {
    res.status(500).json({ message: "postingDelete Error" });
  }
};

module.exports = {
  createPost,
  postingData,
  postingUserData,
  postingUpdate,
  postingDelete,
};
