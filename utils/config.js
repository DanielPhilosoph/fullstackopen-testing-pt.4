require("dotenv").config();
const PORT = 3001;
const MONGO_URL = `mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@cluster0.xx3io.mongodb.net/blogFSO?retryWrites=true&w=majority`;

module.exports = { PORT, MONGO_URL };
