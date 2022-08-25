const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const router = require("./routers");

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(router);
  app.use(cors());
  app.use(morgan());

  return app;
};

module.exports = { createApp };
