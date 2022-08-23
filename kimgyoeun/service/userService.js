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
  //body에서 받아온 pw와 user에서 받아온 pw비교
  const comparePw = bcrypt.compareSync(password, userEmail[0].password);

  if (!comparePw) {
    res.status(400).json({ massage: "비밀번호가 일치하지 않습니다." });
  }

  const token = jwt.sign({ userId: user.id }, "secretKey");

  return await userDao.loginUser(email, password);
};

module.exports = { createUser, loginUser };
