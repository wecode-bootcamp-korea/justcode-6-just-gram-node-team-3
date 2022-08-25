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

// Mission 4-1.Create ===================
const createPost = async (user_id, contents) => {
  return await myDataSource.query(
    `INSERT INTO postings (user_id, contents) VALUES (?, ?)`,
    [user_id, contents]
  );
};

// Mission 4-2.Read ===================
const postingData = async () => {
  return await myDataSource.query(`
  SELECT
    users.id as userId,
    users.profile_image as userProfileImage,
    postings.id as postingId,
    posting_images.image_url as postingImageUrl,
    postings.contents as postingContent
  FROM postings
  JOIN users ON users.id = postings.user_id
  JOIN posting_images ON posting_images.posting_id = postings.id;
`);
};

// Mission 4-3.Read2 ===================
const postingUserData = async (id) => {
  return await myDataSource.query(
    `
    SELECT
      users.id as userId,
      users.profile_image as userProfileImage,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'postingId', postings.id,
          'postingImageUrl', posting_images.image_url,
          'postingContent', postings.contents
          )
        ) as postings
    FROM postings
    JOIN users ON users.id = postings.user_id
    JOIN posting_images ON posting_images.posting_id = postings.id
    WHERE users.id = ?
    GROUP BY users.id;
  `,
    [id]
  );
};

// Mission 4-4.Update ===================
const postingUpdate = async (postingId, updateContent) => {
  // 포스팅번호, 바뀐 컨텐츠내용 받아와서 수정
  await myDataSource.query(
    `
  UPDATE postings
    SET contents = ?
    WHERE id = ?;
`,
    [updateContent, postingId]
  );

  // 바뀐 컨텐츠 내용 객체로 불러오기
  return await myDataSource.query(
    `
    SELECT
      users.id as userId,
      users.nickname as userNickname,
      postings.id as postingId,
      posting_images.image_url as postingImageUrl,
      postings.contents as postingContent
    FROM postings
    JOIN users ON users.id = postings.user_id
    JOIN posting_images ON posting_images.posting_id = postings.id
    WHERE postings.id = ?;
  `,
    [postingId]
  );
};

// Mission 4-5.Delete ===================
const postingDelete = async (id) => {
  //posting 연관된 댓글 먼저 삭제
  await myDataSource.query(
    `
DELETE FROM comments WHERE comments.posting_id =?
`,
    [id]
  );

  //posting id에 맞는 데이터 삭제
  await myDataSource.query(
    `
  DELETE FROM postings
  WHERE postings.id = ?
`,
    [id]
  );
};

module.exports = {
  createPost,
  postingData,
  postingUserData,
  postingUpdate,
  postingDelete,
};
