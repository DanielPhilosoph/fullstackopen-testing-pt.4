require("dotenv").config();
const PORT = 3001;
const MONGO_URL =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

module.exports = { PORT, MONGO_URL };
