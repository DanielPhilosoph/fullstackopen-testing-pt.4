const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
require("express-async-errors");
const blogRouter = require("./controllers/Blogs");
const userRouter = require("./controllers/Users");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const request = require("superagent");

logger.info("connecting to DB - Loading.....");

mongoose
  .connect(config.MONGO_URL)
  .then(() => {
    logger.info("connected to MongoDB");
    console.log("connected to MongoDB " + config.MONGO_URL);
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
