const userDao = require("../models/userDao");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (username, email, password) => {
  console.log("service 1");

  const salt = bcrypt.genSaltSync(12);
  const hashedPw = bcrypt.hashSync(password, salt);
  const user = await userDao.createuser(username, email, hashedPw);
  console.log("service 2");

  return user;
};

const login = async (username, password) => {
  console.log("service 1");
  const user = await userDao.login(username, password);

  if (user) {
    const isPwCorrect = bcrypt.compareSync(password, user.password);
    const token = jwt.sign({ userId: user.id }, "secretKey");
    return user, isPwCorrect, token;
  }

  console.log("service 2");
};

module.exports = {
  createUser,
  login,
};
