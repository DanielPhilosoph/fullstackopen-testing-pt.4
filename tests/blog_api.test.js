const { test, expect } = require("@jest/globals");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

let api = supertest(app);

const data = [
  {
    title: "test1",
    author: "name",
    url: "url",
    likes: 7,
  },
  {
    title: "test2",
    author: "name",
    url: "url",
    likes: 7,
  },
  {
    title: "test2",
    author: "name2",
    url: "url2",
    likes: 8,
  },
  {
    title: "test3",
    author: "name3",
    url: "url3",
    likes: 6,
  },
  {
    title: "test4",
    author: "name",
    url: "url",
    likes: 7,
  },
  {
    title: "test5",
    author: "name",
    url: "url",
    likes: 7,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(data);
});

describe("/api/blogs route", () => {
  test("GET /api/blogs returns all blogs back", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(data.length);
  });

  test("Verify that every blog has a unique id", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0]._id).toBeDefined();
    expect(response.body[1]._id).toBeDefined();
    expect(response.body[2]._id).toBeDefined();
  });

  test("POST /api/blogs creates new blog", async () => {
    const newBlog = {
      title: "how to test api",
      author: "daniel",
      url: "url",
      likes: 20,
    };
    const response = await api.post("/api/blogs").send(newBlog);
    expect(response.body).toHaveLength(data.length + 1);
  });

  test("add blog will give likes 0 if not required", async () => {
    const newBlog = {
      title: "how to default like property",
      author: "Max",
      url: "url",
    };
    const response = await api.post("/api/blogs").send(newBlog);
    expect(response.body).toHaveLength(data.length + 1);
    let maxPost = response.body.filter((blog) => blog.author === "Max");
    expect(maxPost[0].likes).toBe(0);
  });

  test("add blog without title or url will not be allowed", async () => {
    const newBlog = {
      author: "Max",
      url: "url",
    };
    const response = await api.post("/api/blogs").send(newBlog).expect(400);

    const newBlog2 = {
      title: "some title",
      author: "Max",
    };
    const response2 = await api.post("/api/blogs").send(newBlog2).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
