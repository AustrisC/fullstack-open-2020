const Blog = require('../models/blogs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const initialBlogs = [
  {
    title: 'My first blog Entry',
    author: 'Austris',
    url: 'new.blog.url',
    likes: 6,
  },
  {
    title: 'Second blog Entry',
    author: 'John',
    url: 'another.blog.url',
    likes: 9,
  },
];

const resetDb = async () => {
  await Blog.deleteMany();
  const blogPromises = initialBlogs.map((blog) => {
    const blogEntry = new Blog(blog);
    return blogEntry.save();
  });
  await Promise.all(blogPromises);
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const getAuthToken = async () => {
  const savedUsers = await usersInDb();
  const { username, id } = savedUsers[0];

  return jwt.sign({ username, id }, process.env.SECRET);
};

module.exports = {
  initialBlogs,
  resetDb,
  blogsInDb,
  usersInDb,
  getAuthToken,
};
