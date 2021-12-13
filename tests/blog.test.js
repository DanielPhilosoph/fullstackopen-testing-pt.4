const { test, expect } = require("@jest/globals");
const {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} = require("../utils/list_helper");

const blogs = [
  {
    _id: "5a462aa71b54a676234d17f8",
    title: "test",
    author: "name",
    url: "url",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422ab71b54a676234d17f8",
    title: "test",
    author: "name",
    url: "url",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f9",
    title: "test2",
    author: "name2",
    url: "url2",
    likes: 8,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17g8",
    title: "test3",
    author: "name3",
    url: "url3",
    likes: 6,
    __v: 0,
  },
  {
    _id: "5a422aa71654a676234d17f8",
    title: "test",
    author: "name",
    url: "url",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b84a676234d17f8",
    title: "test",
    author: "name",
    url: "url",
    likes: 7,
    __v: 0,
  },
];

test("dummy returns one", () => {
  const blogs = [];

  const result = dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    expect(totalLikes([])).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const blog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "test",
        author: "name",
        url: "url",
        likes: 7,
        __v: 0,
      },
    ];
    expect(totalLikes(blog)).toBe(7);
  });

  test("of a bigger list is calculated right", () => {
    expect(totalLikes(blogs)).toBe(42);
  });
});

describe("favoriteBlog", () => {
  test("find most liked blog", () => {
    expect(favoriteBlog(blogs)).toEqual({
      title: "test2",
      author: "name2",
      likes: 8,
    });
  });
});

describe("mostBlogs", () => {
  test("of zero return undefined", () => {
    expect(mostBlogs([])).toBe(undefined);
  });

  test("of large number of blogs to return most blogs", () => {
    expect(mostBlogs(blogs)).toEqual({
      author: "name",
      blogs: 4,
    });
  });
});

describe("mostLikes", () => {
  test("of zero return undefined", () => {
    expect(mostLikes([])).toBe(undefined);
  });

  test("of large number of blogs to return most likes", () => {
    expect(mostLikes(blogs)).toEqual({
      author: "name",
      likes: 28,
    });
  });
});
