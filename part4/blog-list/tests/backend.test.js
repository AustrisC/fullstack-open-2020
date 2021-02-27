const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');

beforeEach(helper.resetDb);

describe('When there are initially blogs saved', () => {
  test('result is returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('unique identifier property of the blog posts is named id for every object', async () => {
    const blogs = await helper.blogsInDb();

    console.log('BLOGZ', blogs);

    blogs.forEach((blogEntry) => {
      expect(blogEntry.id).toBeDefined();
    });
  });

  test('total count is equivalent to mock database blog count', async () => {
    const blogs = await helper.blogsInDb();

    expect(blogs).toHaveLength(helper.initialBlogs.length);
  });

  test('There is an author named Austris', async () => {
    const blogs = await helper.blogsInDb();

    expect(blogs.map((blog) => blog.author)).toContain('Austris');
  });
});

describe('Viewing a specific blog entry', () => {
  test('a valid blog post is being added', async () => {
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

    const blogs = await helper.blogsInDb();

    const contents = blogs.map((blog) => blog.title);

    expect(blogs).toHaveLength(helper.initialBlogs.length + 1);
    expect(contents).toContain(newBlogTitle);
  });

  test('like count defaults to 0 if there is a blog entry added without like count', async () => {
    const newBlogEntry = {
      title: 'No likes for this blog',
      author: 'Austris',
      url: 'new.blog.no-likes-yet',
    };

    const response = await api.post('/api/blogs').send(newBlogEntry);
    const createdBlog = response.body;
    expect(createdBlog.likes).toBe(0);
  });

  test('throws an error if blog is saved without title and url', async () => {
    const newBlogEntry = {
      author: 'Austris',
      likes: 3,
    };
    await api.post('/api/blogs').send(newBlogEntry).expect(400);

    const blogs = await helper.blogsInDb();

    expect(blogs).toHaveLength(helper.initialBlogs.length);
  });
});

describe('Deleting a blog entry', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const initialBlogEntries = await helper.blogsInDb();
    const blogToDelete = initialBlogEntries[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
    const indices = blogsAtEnd.map((blog) => blog.id);
    expect(indices).not.toContain(blogToDelete.id);
  });
});

describe('Updating blog entry works', () => {
  test('succeeds with status code 200 & matches updated like count', async () => {
    const initialBlogEntries = await helper.blogsInDb();
    const blogToUpdate = initialBlogEntries[0];
    const newLikesCount = 99;

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ ...blogToUpdate, likes: newLikesCount })
      .expect(200);

    expect(response.body.likes).toBe(newLikesCount);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
