const blogsRouter = require('express').Router();
const Blog = require('../models/blogs');

blogsRouter.get('/', async (_, response) => {
  const blogs = await Blog.find({});
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post('/', async (request, response) => {
  const { body } = request;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  const savedBlog = await blog.save();

  response.status(201).json(savedBlog.toJSON());
});

blogsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const blog = await Blog.findById(id);

  if (!blog || Object.keys(blog).length === 0) {
    response.status(404).end();
  }

  response.json(blog.toJSON());
});

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  await Blog.findByIdAndRemove(id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const {
    body,
    params: { id },
  } = request;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });

  if (updatedBlog) {
    response.status(200).json(updatedBlog.toJSON());
  } else {
    response.status(404).end();
  }
});

module.exports = blogsRouter;
