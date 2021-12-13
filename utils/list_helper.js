const Blog = require("../models/blog");
const lodash = require("lodash");

function getAllBlogs() {
  Blog.find({}).then((blogs) => {
    return blogs;
  });
}

function addBlog(blog) {
  const newBlog = new Blog(blog);

  newBlog.save().then((result) => {
    return result;
  });
}

const dummy = (_blogs) => {
  return 1;
};

function totalLikes(blogs) {
  let total = 0;
  blogs.forEach((blog) => {
    total += blog.likes;
  });
  return total;
}

function favoriteBlog(blogs) {
  let favorite = { likes: -1 };
  if (blogs.length === 0) {
    return undefined;
  }
  blogs.forEach((blog) => {
    if (blog.likes > favorite.likes) {
      favorite = Object.assign({
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
      });
    }
  });
  return favorite;
}

function mostBlogs(blogs) {
  if (blogs.length === 0) {
    return undefined;
  }
  const countResults = lodash.countBy(blogs, (blog) => {
    return blog.author;
  });

  // Max by number of blogs
  const highestBlogs = lodash.maxBy(Object.entries(countResults), (entry) => {
    return entry[1];
  });

  return {
    author: highestBlogs[0], //Name of author
    blogs: highestBlogs[1], // Number of blogs
  };
}

function mostLikes(blogs) {
  if (blogs.length === 0) {
    return undefined;
  }
  const map = new Map();
  let highestLikesObj = {
    author: "",
    likes: -1,
  };
  blogs.forEach((blog) => {
    map.set(blog.author, (map.get(blog.author) || 0) + blog.likes);
  });
  blogs.forEach((blog) => {
    if (map.get(blog.author) > highestLikesObj.likes) {
      highestLikesObj = {
        author: blog.author,
        likes: map.get(blog.author),
      };
    }
  });
  return highestLikesObj;
}

module.exports = {
  dummy,
  getAllBlogs,
  addBlog,
  favoriteBlog,
  totalLikes,
  mostBlogs,
  mostLikes,
};
