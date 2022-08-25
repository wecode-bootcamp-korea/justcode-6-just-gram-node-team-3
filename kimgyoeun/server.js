const http = require("http");
require("dotenv").config();
const { createApp } = require("./app");
// const { env } = require("process");

/* const {
  // createUser,
  // createPost,
  // postDataSearch,
  // retouchPost,
  // deletePost,
  // userPostSearch,
} = require("./user"); */

const app = createApp();
const server = http.createServer(app);

server.listen(8000, () => {
  console.log("server is listening on PORT 8000");
});
