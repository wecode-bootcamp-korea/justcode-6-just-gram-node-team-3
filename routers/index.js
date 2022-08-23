const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter.js");
const postingRouter = require("./postingRouter");

router.use("/users", userRouter);
routers.use("/postings", postingRouter);

module.exports = router;
