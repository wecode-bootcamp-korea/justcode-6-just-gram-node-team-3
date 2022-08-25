const userService = require("../services/userService");

// Mission 3 signup + Mission 5 비밀번호 암호화 =====
const createUser = async (req, res) => {
  // console.log("controller 1 ");
  const { email, nickname, password, profile_image } = req.body;

  // 유효성검증
  if (!(email && nickname && password)) {
    res.status(400).json({ message: "input error" });
    return;
  }

  //req.body로 읽은 데이터를 userService로 보내줌
  try {
    const result = await userService.createUser(
      email,
      nickname,
      password,
      profile_image
    );
    // console.log("controller 2");
    res.status(201).json({ message: "userCreated" });
  } catch {
    res.status(500).json({ message: "userCreated Error" });
  }
};

// Mission 6 Login =====================
const userLogin = async (req, res) => {
  console.log("controller 1 ");
  const { email, password } = req.body;

  if (!(email && password)) {
    res.status(400).json({ message: "input error" });
    return;
  }
  const user = await userService.userLogin(email, password);
  // const isPasswordCorrect = await userService.userLogin.isPasswordCorrect;
  // const token = await userService.userLogin.token;
  // console.log(isPasswordCorrect);
  // console.log(token);
  try {
    // 등록된 email인지 확인
    if (!user) {
      console.log("NO_USER");
      res.status(404).json({ message: "userDoesNotExist" });
      return;
    }

    //password가 틀릴 경우
    if (user.isPasswordCorrect === false) {
      res.status(400).json({ message: "INVALID_PASSWORD" });
      return;
    }

    res.status(200).json({ message: "loginSuccess", token: user.token });
  } catch {
    res.status(500).json({ message: "login Error" });
  }
};

module.exports = { createUser, userLogin };
