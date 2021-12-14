const { test, expect } = require("@jest/globals");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

let api = supertest(app);

let globalToken;

const data = [
  {
    title: "test1",
    authorId: mongoose.Types.ObjectId("4edd40c86762e0fb12001113"),
    url: "url",
    likes: 7,
  },
  {
    title: "test2",
    authorId: mongoose.Types.ObjectId("123d40c86762e0fb12000002"),
    url: "url",
    likes: 7,
  },
  {
    title: "test3",
    authorId: mongoose.Types.ObjectId("4edd40c86762e0fb12001113"),
    url: "url2",
    likes: 8,
  },
  {
    title: "test4",
    authorId: mongoose.Types.ObjectId("123d40c86762e0fb12000002"),
    url: "url3",
    likes: 6,
  },
  {
    title: "test5",
    authorId: mongoose.Types.ObjectId("123d40c86762e0fb12000002"),
    url: "url",
    likes: 7,
  },
  {
    title: "test6",
    authorId: mongoose.Types.ObjectId("4edd40c86762e0fb12001113"),
    url: "url",
    likes: 7,
  },
];

const users = [
  {
    username: "michal",
    name: "mish",
    _id: mongoose.Types.ObjectId("4edd40c86762e0fb12001113"),
  },
  {
    username: "daniel",
    _id: mongoose.Types.ObjectId("123d40c86762e0fb12000002"),
  },
];

beforeEach(async () => {
  // Set hashed passwords
  const passwordHash1 = await bcrypt.hash("1234", saltRounds);
  const passwordHash2 = await bcrypt.hash("3456", saltRounds);
  users[0].password = passwordHash1;
  users[1].password = passwordHash2;

  await User.deleteMany({});
  await User.insertMany(users);
  await Blog.deleteMany({});
  await Blog.insertMany(data);
});

describe("login to user", () => {
  test("Can login to user", async () => {
    const userInfo = {
      username: "michal",
      password: "1234",
    };
    const response = await api.post("/api/login").send(userInfo).expect(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.username).toBeDefined();
    globalToken = response.body.token;
  });
});

describe("/api/blogs route", () => {
  test("GET /api/blogs returns all blogs back", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `bearer ${globalToken}`);
    expect(response.body).toHaveLength(data.length);
  });

  test("POST /api/blogs creates new blog", async () => {
    const newBlog = {
      title: "how to test api",
      url: "url",
      likes: 20,
    };
    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `bearer ${globalToken}`);
    expect(response.body).toHaveLength(data.length + 1);

    const newBlog2 = {
      title: "how to test api2",
      url: "url2",
      likes: 10,
    };
    const response2 = await api
      .post("/api/blogs")
      .send(newBlog2)
      .set("Authorization", `bearer ${globalToken}`);
    expect(response2.body).toHaveLength(data.length + 2);
  });

  test("Verify that every blog has a unique id", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `bearer ${globalToken}`);
    expect(response.body[0]._id).toBeDefined();
    expect(response.body[1]._id).toBeDefined();
    expect(response.body[2]._id).toBeDefined();
  });

  test("add blog will give likes 0 if not required", async () => {
    const newBlog = {
      title: "how to default like property",
      author: mongoose.Types.ObjectId("4edd40c86762e0fb12001113"),
      url: "url",
    };
    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `bearer ${globalToken}`);
    expect(response.body).toHaveLength(data.length + 1);
    let michalPost = response.body.filter((blog) => {
      return blog.title === "how to default like property";
    });
    expect(michalPost[0].likes).toBe(0);
  });

  test("Add blog without title or url will not be allowed", async () => {
    const newBlog = {
      author: mongoose.Types.ObjectId("4edd40c86762e0fb12001113"),
      url: "url",
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `bearer ${globalToken}`)
      .expect(400);

    const newBlog2 = {
      title: "some title",
      author: mongoose.Types.ObjectId("4edd40c86762e0fb12001113"),
    };
    await api
      .post("/api/blogs")
      .send(newBlog2)
      .set("Authorization", `bearer ${globalToken}`)
      .expect(400);
  });

  test("Add blog without a token will return status 401", async () => {
    const newBlog = {
      title: "will not work",
      author: mongoose.Types.ObjectId("4edd40c86762e0fb12001113"),
      url: "url",
    };
    await api.post("/api/blogs").send(newBlog).expect(401);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
