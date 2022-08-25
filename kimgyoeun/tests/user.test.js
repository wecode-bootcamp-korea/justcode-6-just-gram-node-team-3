const request = require("supertest");
const { createApp } = require("../app");

const { DataSource } = require("typeorm");

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

//회원가입 테스트
describe("sign up", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await myDataSource.initialize();
  });

  afterAll(async () => {
    // await myDataSource.query("TRUNCATE users");
    await myDataSource.destroy();
  });

  //FAILED 적용해야함

  //SUCCESS
  test("SUCCESS: created user", async () => {
    await request(app)
      .post("/users/signup")
      .send({
        email: "test3@test.com",
        nickname: "test",
        password: "test1234!",
        profile_image: "http://profile_image_test.jpeg",
      })
      .expect(201);
  });
});

//로그인 테스트
describe("login", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await myDataSource.initialize();
  });

  afterAll(async () => {
    //테스트 종료 시 DB커넥션 끊어내주기
    await myDataSource.destroy();
  });

  //FAILED 적용해야함

  //SUCCESS
  test("SUCCESS: user login", async () => {
    await request(app)
      .post("/users/login")
      .send({
        email: "test@test.com",
        password: "test1234!",
      })
      .expect(200);
  });
});
