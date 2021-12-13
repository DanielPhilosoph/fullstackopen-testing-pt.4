const Blog = require("../models/blog");
const lodash = require("lodash");

async function getAllBlogs() {
  const blogs = await Blog.find({});
  return blogs;
}

async function deleteBlog(id) {
  const blog = await Blog.findOne({ _id: id });
  if (blog) {
    await Blog.findOneAndDelete({ _id: id });
    return true;
  }
  return false;
}

async function updateBlogById(id, likes, title, url) {
  const blog = await Blog.findOne({ _id: id });
  if (blog) {
    const updatedObj = {};
    if (likes && !isNaN(likes)) {
      updatedObj.likes = likes;
    }
    if (title) {
      updatedObj.title = title;
    }
    if (url) {
      updatedObj.url = url;
    }
    await Blog.findOneAndUpdate({ _id: id }, updatedObj);
    return true;
  }
  return false;
}

async function addBlog(blog) {
  if (!blog.likes) {
    blog.likes = 0;
  }
  if (!blog.title || !blog.url) {
    console.log("Missing property");
    return "Missing property";
  } else {
    const newBlog = new Blog(blog);

    await newBlog.save();
    return await getAllBlogs();
  }
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
  deleteBlog,
  updateBlogById,
};
