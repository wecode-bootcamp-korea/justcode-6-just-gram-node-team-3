require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userController = require("./controller/userControl");
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
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //이메일 가입여부 확인
  const user = await myDataSource.query(
    `SELECT id, email, password
    FROM users
    WHERE email = ?`,
    [email]
  );

  if (!user) {
    res.status(400).json({ massage: "가입된 이메일이 없습니다." });
  }

  //body에서 받아온 pw와 user에서 받아온 pw비교
  const comparePw = bcrypt.compareSync(password, user[0].password);

  if (!comparePw) {
    res.status(400).json({ massage: "비밀번호가 일치하지 않습니다." });
  }

  const token = jwt.sign({ userId: user.id }, "");

  res.status(200).json({ massage: "LOGIN_SUCCESS", token: token });
});

//게시글 추가
app.post("/addpost", async (req, res) => {
  const { user_id, contents, posting_id, image_url } = req.body;

  try {
    await myDataSource.query(
      `INSERT INTO postings ( user_id, contents ) 
      VALUE (?, ?)`,
      [user_id, contents]
    ),
      await myDataSource.query(
        `INSERT INTO posting_images ( posting_id, image_url )
      VALUE (?, ?)`,
        [posting_id, image_url]
      );
    res.status(201).json({ massage: "postCreated" });
  } catch (err) {
    res.status(500).json({ massage: "error" });
  }
});

//게시글 조회
app.get("/postsearch", async (req, res) => {
  try {
    const postings = await myDataSource.query(
      `SELECT 
        p.user_id, u.profile_image, 
        p_i.posting_id, p_i.image_url, p.contents
      FROM users u
      JOIN postings p
      ON u.id = p.user_id
      JOIN posting_images p_i
      ON p.id = p_i.posting_id`
    );
    res.json({ data: postings });
  } catch (err) {
    res.json({ massage: "게시글 조회 error" });
  }
});

//유저의 게시글 조회
//JSON.parse() 적용해야함
app.get("/userpost/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const userPostings = await myDataSource.query(
      `SELECT p.user_id, u.profile_image,
      GROUP_CONCAT(
        JSON_ARRAY(
          JSON_OBJECT(
            'postingId', p_i.posting_id, 
            'postingImgUrl', p_i.image_url,
            'postingContents', p.contents
          )
        )
      ) AS postings
      FROM postings p
      JOIN users u ON u.id = p.user_id
      JOIN posting_images p_i ON p.id = p_i.posting_id
      WHERE p.user_id = ?`,
      [userId]
    );
    //JSON.parse()
    res.status(200).json({ data: userPostings });
  } catch (err) {
    res.json({ massage: "유저의 게시글 조회 error" });
  }
});

//게시글 수정
//이미지url수정 기능 추가해야함
app.patch("/retouchPost", async (req, res) => {
  const { id, newContents } = req.body;

  try {
    await myDataSource.query(
      `UPDATE postings
      SET contents = ?
      WHERE id = ?`,
      [newContents, id]
    );
    const newPostingData = await myDataSource.query(
      `SELECT p.user_id, u.profile_image, 
      p_i.posting_id, p_i.image_url, p.contents
      FROM postings p
      JOIN users u ON u.id = p.user_id
      JOIN posting_images p_i ON p.id = p_i.posting_id
      WHERE p.id = ?`,
      [id]
    );
    res.status(200).json({ data: newPostingData });
  } catch (err) {
    res.json({ massage: "게시글 수정 error" });
  }
});

//게시글 삭제
app.delete("/delete", async (req, res) => {
  await myDataSource.query(
    `DELETE FROM postings 
    WHERE postings.id = 7`
  );
  res.status(204).json({ message: "postingDeleted" });
});

const server = http.createServer(app);

server.listen(8000, () => {
  console.log("server is listening on PORT 8000");
});
