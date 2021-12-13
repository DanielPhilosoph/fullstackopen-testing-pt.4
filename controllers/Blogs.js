const router = require("express").Router();
const Blog = require("../models/blog");
const { addBlog, getAllBlogs } = require("../utils/list_helper");

router.get("/", (_request, response) => {
  const blogs = getAllBlogs();
  response.json(blogs);
});

router.post("/", (request, response) => {
  const result = addBlog(request.body);
  response.status(201).json(result);
});

module.exports = router;
