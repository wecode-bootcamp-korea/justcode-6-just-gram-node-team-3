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
    console.log("Data Source has been initialized!");
  })
  .catch(() => {
    console.log("Database initiate fail");
  });

const createuser = async (username, email, hashedPw) => {
  console.log("model 1");
  const user = await myDataSource.query(
    `
        INSERT INTO USERS(username, email, password)
        VALUES (?, ?, ?)
      `,
    [username, email, hashedPw]
  );
  console.log("model 2");
  return user;
};

const login = async (username, password) => {
  console.log("dao 1");

  const [user] = await myDataSource.query(
    `
    SELECT
      id,
      username,
      password
    FROM users
    WHERE username = ?
  `,
    [username]
  );
  return user;

  console.log("dao 2");
};

module.exports = {
  createuser,
  login,
};
