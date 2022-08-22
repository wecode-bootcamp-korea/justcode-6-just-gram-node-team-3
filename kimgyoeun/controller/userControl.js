const userService = require("../service/userService");

const createUser = async (req, res) => {
  const { email, nickname, password, profile_image } = req.body;

  if (!email) {
    res.status(400).json({ massage: "이메일이 입력되지 않았습니다." });
    return;
  }

  if (!password) {
    res.status(400).json({ massage: "비밀번호가 입력되지 않았습니다." });
    return;
  }

  await userService.createUser(email, nickname, password, profile_image);

  res.status(201).json({ massage: "userCreated" });
};

module.exports = { createUser };
