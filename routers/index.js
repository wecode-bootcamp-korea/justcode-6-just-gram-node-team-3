const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter.js");
const postingRouter = require("./postingRouter.js");

router.use("/users", userRouter);
router.use("/posts", postingRouter);

module.exports = router;
