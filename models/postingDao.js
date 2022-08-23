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

const createPost = async (user_id, contents) => {
  const post = await myDataSource.query(
    `
      INSERT INTO postings ( user_id, contents ) 
      VALUES ( ?, ?)
    `,
    [user_id, contents]
  );

  return post;
};

const getPost = async () => {
  const post = await myDataSource.query(`
    SELECT
      users.id as users_id,
      postings.id as posting_id,
      contents,
      username
    FROM typeorm_study.postings
    JOIN typeorm_study.users ON users.id = postings.user_id;
  `);
  return post;
};

const getUserPost = async () => {
  const post = await myDataSource.query(`
    SELECT
    users.id as user_id,
    username,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'postingId', postings.id,
          'postingContents', postings.contents
        )
    ) as postings
  FROM justgram.postings
  JOIN justgram.users ON users.id = postings.user_id
  WHERE users.id = 1
  GROUP BY users.id;
  `);
  return post;
};

const updatePost = async (newContents) => {
  const updatedPost = await myDataSource.query(
    `
      UPDATE postings
      SET contents = ?
      WHERE id = 1;
    `,
    [newContents]
  );
  return updatedPost;
};

const deletePost = async () => {
  console.log("dao 1");
  const deleteComment = await myDataSource.query(`
      DELETE FROM comments WHERE comments.posting_id = 1;
    `);
  const deletePost = await myDataSource.query(`
      DELETE FROM postings WHERE postings.id = 1;
    `);
  console.log("dao 2");
  return deleteComment, deletePost;
};

module.exports = {
  createPost,
  getPost,
  getUserPost,
  updatePost,
  deletePost,
};
