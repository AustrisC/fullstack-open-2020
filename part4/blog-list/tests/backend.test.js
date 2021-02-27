const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blogs');

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

beforeEach(async () => {
  await Blog.deleteMany();
  const blogPromises = initialBlogs.map((blog) => {
    const blogEntry = new Blog(blog);
    return blogEntry.save();
  });
  await Promise.all(blogPromises);
});

describe('Fetching blogs', () => {
  test('result is returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('unique identifier property of the blog posts is named id for every object', async () => {
    const response = await api.get('/api/blogs');

    response.body.forEach((blogEntry) => {
      expect(blogEntry.id).toBeDefined();
    });
  });
});

test('The initial blogs count is equivalent to mock database', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(initialBlogs.length);
});

test('A valid blog post is added', async () => {
  const newBlogTitle = 'third blog Entry';
  const newBlogEntry = {
    title: newBlogTitle,
    author: 'Austris',
    url: 'new.blog.url33',
    likes: 3,
  };

  await api
    .post('/api/blogs')
    .send(newBlogEntry)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');

  const contents = response.body.map((blog) => blog.title);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(contents).toContain(newBlogTitle);
});

test('Like count defaults to 0 if there is a blog entry added without like count', async () => {
  const newBlogEntry = {
    title: 'No likes for this blog',
    author: 'Austris',
    url: 'new.blog.no-likes-yet',
  };

  const response = await api.post('/api/blogs').send(newBlogEntry);
  const createdBlog = response.body;
  expect(createdBlog.likes).toBe(0);
});

test('Throws an error if blog is saved without title and url', async () => {
  const newBlogEntry = {
    author: 'Austris',
    likes: 3,
  };
  await api.post('/api/blogs').send(newBlogEntry).expect(400);

  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(initialBlogs.length);
});

test('There is an author named Austris', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body.map((blog) => blog.author)).toContain('Austris');
});

afterAll(() => {
  mongoose.connection.close();
});
