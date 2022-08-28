const userDao = require("../models/userDao");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Mission 3 signup + Mission 5 비밀번호 암호화 =====
//userController 에서 받아온 req 중 비밀번호 암호화해서 데이터베이스에 저장
const createUser = async (email, nickname, password, profile_image) => {
  //비밀번호 암호화
  // console.log("service 1");
  const salt = bcrypt.genSaltSync(12);
  const hashedPw = bcrypt.hashSync(password, salt);

  const user = await userDao.createUser(
    email,
    nickname,
    hashedPw,
    profile_image
  );
  // console.log("service 2");
  return user;
};

// Mission 6 Login =====================
const userLogin = async (email, password) => {
  const user = await userDao.userLogin(email);

  // 입력한 email,password 가 저장된 데이터와 동일한 경우
  if (user) {
    // 등록된 email일 경우 유저 데이터 및 유저 비밀번호 디비에서 꺼내옴
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    //token 생성
    const token = jwt.sign({ userId: user.id }, "secretKey");
    const userLoginData = {
      user: user,
      isPasswordCorrect: isPasswordCorrect,
      token: token,
    };
    return userLoginData;
  }
};

module.exports = { createUser, userLogin };
