const { header } = require("express/lib/request");
const { json } = require("express/lib/response");

const users = [
  {
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },
];

let posts = [
  {
    id: 1,
    title: "간단한 HTTP API 개발 시작!",
    content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
    userId: 1,
  },
  {
    id: 2,
    title: "HTTP의 특성",
    content: "Request/Response와 Stateless!!",
    userId: 1,
  },
];
let postId = 3;

//회원가입
/* const createUser = (req, res) => {
  const { id, name, email, password } = req.body.data;
  users.push({ id, name, email, password });
  res.json({ message: "userCreated" });
}; */

/* const createUser = (req, res) => {
  const { name, email, password } = req.query;
  const DataSource = myDataSource.query(
    `INSERT INTO users (name, email, password)
    VALUE (?, ?, ?)`,
    [name, email, password]
  );
  DataSource.then((value) => {
    res.status(201).json({ massage: "userCreated" });
  }).catch(() => {
    res.status(500).json({ massage: "error" });
  });
}; */

//게시글 등록
/* const createPost = (req, res) => {
  const { id, title, content, userId } = req.body.data;
  posts.push({ id, title, content, userId });
  res.json({ message: "postCreated" });
}; */

/* const createPost = (req, res) => {
  // const { title, content, userId } = req.body.data;
  posts.push({
    id: postId++,
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
  });
  res.status(201).json({ message: "postCreated" });
}; */

//게시글 검색
/* const postDataSearch = (req, res) => {
  const postWithUserName = posts.map((post) => {
    post.userId;
    const user = users.find((user) => post.userId === user.id);
    return {
      postId: post.id,
      postTitle: post.title,
      postContent: post.content,
      userId: post.userId,
      userName: user.name,
    };
  });
  res.json({ data: postWithUserName });
}; */

//게시글 수정
/* const retouchPost = (req, res) => {
  const { id, content } = req.body;
  const post = posts.find((post) => post.id === id);
  post.content = content;
  const user = users.find((user) => post.userId === user.id);
  const newPost = {
    postId: post.id,
    postTitle: post.title,
    postContent: post.content,
    userId: post.userId,
    userName: user.name,
  };
  res.json({ data: newPost });
}; */

//게시글 삭제
/* const deletePost = async (req, res, next) => {
  try {
    await posts.destroy({
      where: { id: req.params.id, userId: req.params.userId },
    });
    res.json({ message: "postingDeleted" });
  } catch (error) {
    res.send("실패");
    console.error(error);
    next(error);
  }
}; */
/* const deletePost = (req, res) => {
  let { id } = req.query;
  const newId = Number(id);
  const result = posts.filter((post) => post.id !== newId);
  posts = result;
  res.json({ data: posts });
}; */

//유저와 게시글 조회
/* const userPostSearch = (req, res) => {
  const userId = Number(req.query.userId);
  const userInfo = users.find((user) => user.id === userId);
  const postings = posts.filter((post) => post.userId === userId);

  let newPostings = [];

  postings.forEach((post) => {
    let tmp = {
      postingId: post.id,
      postingName: post.title,
      postingContent: post.content,
    };
    newPostings.push(tmp);
  });
  const newPost = {
    userId,
    userName: userInfo.name,
    postings: newPostings,
  };
  res.json({ data: newPost });
}; */

/* module.exports = {
  // createUser,
  // createPost,
  // postDataSearch,
  // retouchPost,
  // deletePost,
  // userPostSearch,
}; */
