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

//게시글 추가
const createPost = async (user_id, contents, posting_id, image_url) => {
  await myDataSource.query(
    `INSERT INTO postings ( user_id, contents ) 
    VALUES (?, ?)`,
    [user_id, contents]
  );

  const post = await myDataSource.query(
    `INSERT INTO posting_images ( posting_id, image_url )
    VALUES (?, ?)`,
    [posting_id, image_url]
  );
  return post;
};

//게시글 조회
const readPost = async () => {
  const postings = await myDataSource.query(
    `SELECT 
      p.user_id, u.profile_image, 
      p_i.posting_id, p_i.image_url, p.contents
    FROM users u
    JOIN postings p
    ON u.id = p.user_id
    JOIN posting_images p_i
    ON p.id = p_i.posting_id`
  );
  return postings;
};

//유저 게시글 조회
const readUserPost = async (userId) => {
  const userPostings = await myDataSource.query(
    `SELECT p.user_id, u.profile_image,
    GROUP_CONCAT(
      JSON_ARRAY(
        JSON_OBJECT(
          'postingId', p_i.posting_id, 
          'postingImgUrl', p_i.image_url,
          'postingContents', p.contents
        )
      )
    ) AS postings
    FROM postings p
    JOIN users u ON u.id = p.user_id
    JOIN posting_images p_i ON p.id = p_i.posting_id
    WHERE p.user_id = ?`,
    [userId]
  );
  return userPostings;
};

//게시글 수정
const editPost = async (id, newContents) => {
  await myDataSource.query(
    `UPDATE postings
    SET contents = ?
    WHERE id = ?`,
    [newContents, id]
  );
  const newPostingData = await myDataSource.query(
    `SELECT p.user_id, u.profile_image, 
    p_i.posting_id, p_i.image_url, p.contents
    FROM postings p
    JOIN users u ON u.id = p.user_id
    JOIN posting_images p_i ON p.id = p_i.posting_id
    WHERE p.id = ?`,
    [id]
  );
  return newPostingData;
};

//게시글 삭제
const deletePost = async (postingId) => {
  const deleted = await myDataSource.query(
    `DELETE FROM postings 
  WHERE postings.id = ?`,
    [postingId]
  );
  return deleted;
};

module.exports = {
  createPost,
  readPost,
  editPost,
  readUserPost,
  deletePost,
};
