const http = require("http");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const userController = require("./controllers/userController");

const app = express();
app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({ message: "/ pong" });
});

app.post("/signup", userController.createUser);
app.post("/postings", userController.createPost);
app.get("/postings", userController.getPost);
app.get("/postings/user/1", userController.getUserPost);
app.patch("/postings/1", userController.updatePost);
app.delete("/postings/1", userController.deletePost);
app.post("/login", userController.login);

const server = http.createServer(app);

server.listen(8000, () => {
  console.log("server is running on PORT 8000");
});

console.log(process.env);
