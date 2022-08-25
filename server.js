const http = require("http");
const dotenv = require("dotenv");
dotenv.config();
const { createApp } = require("./app");

const app = createApp();
const server = http.createServer(app);

server.listen(8000, () => {
  console.log("server is running on PORT 8000");
});
