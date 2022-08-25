const { DataSource } = require("typeorm");

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized");
  })
  .catch(() => {
    console.log("Database initiate fail");
  });

// Mission 3 signup + Mission 5 비밀번호 암호화 =====
const createUser = async (email, nickname, hashedPw, profile_image) => {
  // console.log("model 1");
  const user = await myDataSource.query(
    `
    INSERT INTO users(email, nickname, password, profile_image)
    VALUES (?, ?, ?, ?)
  `,
    [email, nickname, hashedPw, profile_image]
  );

  // console.log("model 2");
  return user;
};

// Mission 6 Login =====================
const userLogin = async (email) => {
  console.log("model 1");
  const [user] = await myDataSource.query(
    `
    SELECT
      id,
      email,
      password
    FROM users
    WHERE email = ?
  `,
    [email]
  );
  console.log("model 2");
  return user;
};

module.exports = { createUser, userLogin };
