const userDao = require("../model/userDao");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

module.exports = { createUser };
