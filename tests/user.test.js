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

describe("User signup test", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await myDataSource.initialize();
  });

  afterAll(async () => {
    await myDataSource.query(`TRUNCATE users`);
    await myDataSource.destroy();
  });

  test("SUCCESS: created user", async () => {
    await request(app)
      .post("/users/signup")
      .send({
        username: "kimcode",
        email: "kimcode@gmail.com",
        password: "password123",
      })
      .expect(201);
  });

  test("SUCCESS: login", async () => {
    const response = await request(app)
      .post("/users/login")
      .send({
        username: "kimcode",
        password: "password123",
      })
    expect(response).toBe(200);
    expect(response.body.has('token')).toBe(true)
  });
});
