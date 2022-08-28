const express = require("express");
const router = express.Router();
const cors = require("cors");

const userRouter = require("./userRouter");
const postRouter = require("./postRouter");

router.get("/ping", (req, res) => {
  res.json({ message: "/ pong" });
});

router.use("/users", userRouter);
router.use("/postings", postRouter);
router.use(cors("http://localhost:3000"));

module.exports = router;
