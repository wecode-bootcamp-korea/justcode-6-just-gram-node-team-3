const userDao = require("../model/userDao");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//회원가입
const createUser = async (email, nickname, password, profile_image) => {
  //아이디 중복검사
  /* try {
    await myDataSource.query(`SELECT email FROM users u WHERE email=?`);
  } catch (err) {
    res.status(400).json({ massage: "가입된 이메일이 있습니다." });
    return;
  } */

  const hashedPw = await bcrypt.hash(password, 12);

  const user = await userDao.createUser(
    email,
    nickname,
    hashedPw,
    profile_image
  );
  return user;
};

//로그인
const loginUser = async (email, password) => {
  const selectUser = await userDao.selectUser(email, password);

  if (!selectUser[0]) {
    const error = new Error("NOT_A_USER");
    error.statusCode = 404;
    throw error;
  }
  //body에서 받아온 pw와 user에서 받아온 pw비교
  const comparePw = bcrypt.compareSync(password, selectUser[0].password);

  if (comparePw) {
    const token = jwt.sign(
      { userId: selectUser[0].id },
      process.env.SECRET_KEY
    );
    return token;
  } else {
    const error = new Error("WRONG_PASSWORD");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = { createUser, loginUser };
