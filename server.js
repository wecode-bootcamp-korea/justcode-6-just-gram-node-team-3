const dotenv = require("dotenv");
dotenv.config();
const http = require("http");
const express = require("express");
const router = require("./routers");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(router);

app.use(cors("http://localhost:4000"));

app.get("/", (req, res) => {
  res.status(200).send("pong");
});

const server = http.createServer(app);
server.listen(8000, () => {
  console.log("server is listening on PORT 8000");
});
