const router = require("express").Router();
const {
  addBlog,
  getAllBlogs,
  deleteBlog,
  updateBlogById,
} = require("../utils/list_helper");

router.get("/", async (_request, response) => {
  const blogs = await getAllBlogs();

  response.json(blogs);
});

router.post("/", async (request, response) => {
  const result = await addBlog(request);
  if (typeof result === "string") {
    if (result === "token missing or invalid") {
      return response.status(401).send(result);
    }
    response.status(400).send(result);
  } else {
    response.status(201).json(result);
  }
});

router.delete("/:id", async (request, response) => {
  const blogs = await deleteBlog(request);
  if (blogs) {
    response.status(200).send(blogs);
  } else {
    response.status(400).send("Id does not exists");
  }
});

router.put("/:id", async (request, response) => {
  if (
    updateBlogById(
      request.params.id,
      request.body.likes,
      request.body.title,
      request.body.url
    )
  ) {
    response.status(200).json({ updated: true });
  } else {
    response.status(400).send("Id does not exists");
  }
});

module.exports = router;
