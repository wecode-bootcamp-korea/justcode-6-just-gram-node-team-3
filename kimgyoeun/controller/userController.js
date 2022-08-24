const userService = require("../service/userService");

//회원가입
const createUser = async (req, res) => {
  const { email, nickname, password, profile_image } = req.body;

  if (!email) {
    res.status(400).json({ message: "이메일이 입력되지 않았습니다." });
    return;
  }

  if (!password) {
    res.status(400).json({ message: "비밀번호가 입력되지 않았습니다." });
    return;
  }

  await userService.createUser(email, nickname, password, profile_image);

  res.status(201).json({ message: "userCreated" });
};

//로그인
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }

    const token = await userService.loginUser(email, password);

    res.status(200).json({ message: "LOGIN_SUCCESS", token: token });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { createUser, loginUser };
