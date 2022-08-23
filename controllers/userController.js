const userService = require("../services/userService");

const createUser = async (req, res) => {
  console.log("controller 1");

  const { username, email, password } = req.body;

  const hasKey = { username: false, email: false, password: false };
  const requireKey = Object.keys(hasKey);

  Object.entries(req.body).forEach((keyValue) => {
    const [key, value] = keyValue;
    if (requireKey.includes(key) && value) {
      hasKey[key] = true;
    }
  });

  const hasKeyArray = Object.entries(hasKey);
  for (let i = 0; i < hasKeyArray.length; i++) {
    const [key, value] = hasKeyArray[i];
    if (!value) {
      res.status(400).json({ message: `${key}이/가 없습니다.` });
      return;
    }
  }
  const user = await userService.createUser(username, email, password);

  console.log("controller 2");

  res.status(201).json({ message: "userCreated" });
};

const login = async (req, res) => {
  console.log("controller 1");
  const { username, password } = req.body;

  const user = await userService.login(username, password);
  const isPwCorrect = await userService.login.isPwCorrect;
  const token = await userService.login.token;

  if (!user) {
    console.log("NO_USER");
    res.status(400).json({ message: "NO_USER" });
    return;
  }

  if (isPwCorrect === false) {
    res.status(400).json({ message: "INVALID_PASSWORD" });
  }

  res.status(200).json({ message: "LOGIN_SUCCESS", token: token });
  console.log("controller 2");
};

module.exports = {
  createUser,
  login,
};
