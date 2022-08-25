const dotenv = require("dotenv");
dotenv.config();
const http = require("http");
const express = require("express");
const userController = require("./controllers/userController");
const postController = require("./controllers/postController");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("pong");
});

// Mission 3 유저 회원가입 하기
app.post("/signup", userController.createUser);

//Mission 4-1.Create
app.post("/postCreate", postController.createPost);

//Mission 4-2.Read
app.get("/posts", postController.postingData);

//Mission 4-3.Read2
app.get("/posts-user", postController.postingUserData);

// Mission 4-4 Update
app.patch("/posting-update", postController.postingUpdate);

//Mission 4-5 Delete
app.delete("/delete", postController.postingDelete);

//Mission 6 유저 로그인하기
app.post("/login", userController.userLogin);

const server = http.createServer(app);
server.listen(8000, () => {
  console.log("server is listening on PORT 8000");
});
