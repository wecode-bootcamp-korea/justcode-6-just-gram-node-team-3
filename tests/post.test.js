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

describe("Post tests", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await myDataSource.initialize();
  });

  afterAll(async () => {
    await myDataSource.query(`TRUNCATE postings`);
    await myDataSource.destroy();
  });

  test("SUCCESS: created post", async () => {
    await request(app)
      .post("/posts/post")
      .send({
        user_id: 1,
        contents: "created post",
      })
      .expect(201);
  });

  test("SUCCESS: received post", async () => {
    await request(app).get("/posts/post").expect(200);
  });

  test("SUCCESS: received user post", async () => {
    await request(app).get("/posts/post/1").expect(200);
  });

  test("SUCCESS: updated post", async () => {
    await request(app)
      .patch("/posts/post/1")
      .send({
        newContents: "new content",
      })
      .expect(200);
  });

  test("SUCCESS: deleted post", async () => {
    await request(app) //dkasakdnaoisndoas
      .delete("/posts/post/1")
      .expect(204);
  });
});
