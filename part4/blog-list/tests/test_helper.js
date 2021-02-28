const Blog = require('../models/blogs');
const User = require('../models/user');
const bcrypt = require('bcrypt');
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
    author: 'Austris',
    url: 'another.blog.url',
    likes: 9,
  },
];

const resetDb = async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash('sekret', 10);
  const user = new User({ username: 'root', passwordHash });
  await user.save();

  const savedUsers = await usersInDb();
  const { id } = savedUsers[0];

  await Blog.deleteMany();
  const blogPromises = initialBlogs.map((blog) => {
    const blogEntry = new Blog({ ...blog, user: id });
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
