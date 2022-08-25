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

//게시글추가 테스트
describe("createPost", () => {
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
  test("SUCCESS: created post", async () => {
    await request(app)
      .post("/postings")
      .send({
        user_id: "1",
        contents: "테스트 입니다.",
        posting_id: "1",
        image_url: "http://posting_1_image_test.jpeg",
      })
      .expect(201);
  });
});

//게시글조회 테스트
describe("readPost", () => {
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
  test("SUCCESS: readPost", async () => {
    await request(app).get("/postings").expect(200);
  });
});

// //유저와 게시글 조회 테스트
// describe("readUserPost", () => {
//   let app;

//   beforeAll(async () => {
//     app = createApp();
//     await myDataSource.initialize();
//   });

//   afterAll(async () => {
//     //샘플 데이터 삭제
//     // await myDataSource.query("TRUNCATE users");
//     //테스트 종료 시 DB커넥션 끊어내주기
//     await myDataSource.destroy();
//   });

//   //FAILED 적용해야함

//   //SUCCESS
//   test("SUCCESS: readUserPost", async () => {
//     await request(app)
//       .get("/postings/:userId")
//       /* .send({
//         user_id: "1",
//         contents: "테스트 입니다.",
//         posting_id: "1",
//         image_url: "http://posting_1_image_test.jpeg",
//       }) */
//       .expect(200);
//   });
// });

//게시글수정 테스트
describe("editPost", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await myDataSource.initialize();
  });

  afterAll(async () => {
    //샘플 데이터 삭제
    await myDataSource.query("TRUNCATE postings");
    await myDataSource.query("TRUNCATE users");

    //테스트 종료 시 DB커넥션 끊어내주기
    await myDataSource.destroy();
  });

  //FAILED 적용해야함

  //SUCCESS
  test("SUCCESS: editPost", async () => {
    await request(app)
      .patch("/postings")
      .send({
        newContents: "테스크 게시글 수정",
        id: 1,
      })
      .expect(200);
  });
});

/* //게시글삭제 테스트
describe("deletePost", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await myDataSource.initialize();
  });

  afterAll(async () => {
    //샘플 데이터 삭제
    await myDataSource.query("TRUNCATE users");
    //테스트 종료 시 DB커넥션 끊어내주기
    await myDataSource.destroy();
  });

  //FAILED 적용해야함

  //SUCCESS
  test("SUCCESS: deletePost", async () => {
    await request(app)
      .delete("/postings/:postingId")
      .send({
        newContents: "테스크 게시글 수정",
        id: 1
      })
      .expect(204);
  });
}); */
