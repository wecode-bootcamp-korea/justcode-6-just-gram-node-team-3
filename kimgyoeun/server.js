require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userController = require("./controller/userController");
const postController = require("./controller/postController");
// const { env } = require("process");

/* const {
  // createUser,
  // createPost,
  // postDataSearch,
  // retouchPost,
  // deletePost,
  // userPostSearch,
} = require("./user"); */

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan());

//회원가입
app.post("/signup", userController.createUser);

//로그인
app.post("/login", userController.loginUser);

/* async (req, res) => {
  const { email, password } = req.body;

  //이메일 가입여부 확인
  const userEmail = await myDataSource.query(
    `SELECT id, email, password
    FROM users
    WHERE email = ?`,
    [email]
  );

  if (!userEmail) {
    res.status(400).json({ massage: "가입된 이메일이 없습니다." });
  }

  //body에서 받아온 pw와 user에서 받아온 pw비교
  const comparePw = bcrypt.compareSync(password, userEmail[0].password);

  if (!comparePw) {
    res.status(400).json({ massage: "비밀번호가 일치하지 않습니다." });
  }

  const token = jwt.sign({ userId: user.id }, "secretKey");

  res.status(200).json({ massage: "LOGIN_SUCCESS", token: token });
}); */

//게시글 추가
app.post("/addpost", postController.createPost);

//게시글 조회
app.get("/postings", postController.readPost);

//유저의 게시글 조회
//JSON.parse() 적용해야함
app.get("/userpost/user/:userId", postController.readUserPost);

//게시글 수정
//이미지url수정 기능 추가해야함
app.patch("/retouchPost", postController.editPost);

//게시글 삭제
app.delete("/delete/post/:postingId", postController.deletePost);

const server = http.createServer(app);

server.listen(8000, () => {
  console.log("server is listening on PORT 8000");
});
