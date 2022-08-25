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
    await myDataSource.query(`TRUNCATE comments`);
    await myDataSource.query(`TRUNCATE postings`);
    await myDataSource.query(`TRUCATE users`);
    await myDataSource.destroy();
  });

  describe("Create postings", () => {

    beforeAll(async() => {
      await myDataSource.query(`
        INSERT INTO users(id, username, password)
        VALUES(1, 'soheonLee', '$eyjsffieeisfjkd') 
      `)
    })

    test("SUCCESS: created post", async () => {
      await request(app)
        .post("/posts/post")
        .send({
          user_id: 1,
          contents: "created post",
        })
        .expect(201);
  
        // database postings table <- user_id FOREIGN KEY CONSTRAINT ??
        // SELECT * FROM postings
        // JOIN users ON users.id = postings.user_id
    });
  
    test("FAIL: create posting with non-existing user", async () => {
      await request(app)
        .post("/posts/post")
        .send({
          user_id: 100,
          contents: "created post",
        })
        .expect(404)
        .expect("USER_NOT_FOUND")
    })
  }) 

  describe("Get postings", () => {
    beforeAll(async() => {
      await myDataSource.query(`
        INSERT INTO postings(id, user_id, contents)
        VALUES(1, 1, 'hello world');
      `)
    })
    test("SUCCESS: received post", async () => {
      await request(app).get("/posts/post").expect(200);
    }); 

    test("FAIL: received post", async () => {
      
    })
  })

  describe("Get user posting", () => {
    test("SUCCESS: received user post", async () => {
      await request(app).get("/posts/post/1").expect(200);
    });
  })

  // 가정.
  // username이 'junyoung'을 찾아서, username을 'glory'바꾼다.
  describe("Update posting username", () => {
    beforeEach(async() => {
      await myDataSource.query(`
        INSERT INTO users(id, username, password)
        VALUES(1, 'junyoung', '$eyjsffieeisfjkd') 
      `)
    })
    afterEach(async() => {
      await myDataSource.query(`
        TRUNCATE users;
      `)
    })
    // 가정.
    // username이 'junyoung'을 찾아서, username을 'glory'바꾼다.
    test("SUCCESS: updated user username", async () => {
      await request(app)
        .patch("/posts/post/username/junyoung")
        .send({
          newUsername: "glory",
        })
        .expect(200);
    });
    // 가정.
    // username이 'junyoung'을 찾아서, username을 'glory'바꾼다.
    test("FAIL: update username into too long name", async() => {
      await request(app)
      .patch("/posts/post/username/junyoung")
      .send({
        newUsername: "glory*100"
      })
      .expect(400)
      .expect("USERNAME_TOO_LONG"); // <-("USERNAME_NOT_FOUND")
    })
  })

  test("SUCCESS: deleted post", async () => {
    await request(app) //dkasakdnaoisndoas
      .delete("/posts/post/1")
      .expect(204);
  });
});
