const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('Total Likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ];

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
});

describe('Favorite blog', () => {
  const favoriteBlog = {
    title: 'How microdosing increases your productivity during lockdown',
    author: 'John Higher',
    likes: 420,
  };

  const blogList = [
    favoriteBlog,
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    },
    {
      title: 'Another clickbaity title',
      author: 'Yours Truly',
      likes: 4,
    },
  ];

  test('from a list of blogs returns the one with most likes', () => {
    const result = listHelper.favoriteBlog(blogList);
    expect(result).toEqual(favoriteBlog);
  });
});

describe('Top Blogger', () => {
  const topBlogger = {
    author: 'Top Dawg',
    blogs: 69,
  };

  const blogList = [
    topBlogger,
    {
      author: 'Robert C. Martin',
      blogs: 3,
    },
    {
      author: 'Qwerty Asdfy',
      blogs: 12,
    },
  ];

  test('from a list of blogs returns the author with largest amount of blogs', () => {
    const result = listHelper.mostBlogs(blogList);
    expect(result).toEqual(topBlogger);
  });
});

describe('Most likes', () => {
  const topBlogger = {
    author: 'Top Dawg',
    likes: 69,
  };

  const blogList = [
    topBlogger,
    {
      author: 'Robert C. Martin',
      likes: 3,
    },
    {
      author: 'Qwerty Asdfy',
      likes: 12,
    },
  ];

  test('from a list of blogs returns the author with the most likes', () => {
    const result = listHelper.mostLikes(blogList);
    expect(result).toEqual(topBlogger);
  });
});
