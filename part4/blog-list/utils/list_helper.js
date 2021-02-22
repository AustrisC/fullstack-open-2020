const dummy = (blogs) => 1;

const totalLikes = (blogEntries) =>
  blogEntries.reduce((acc, blogEntry) => {
    if (Object.prototype.hasOwnProperty.call(blogEntry, 'likes')) {
      return acc + blogEntry.likes;
    }

    return acc;
  }, 0);

const favoriteBlog = (blogEntries) =>
  blogEntries.reduce((a, b) => (a.likes > b.likes ? a : b));

const mostBlogs = (blogArray) =>
  blogArray.reduce((a, b) => (a.blogs > b.blogs ? a : b));

const mostLikes = (blogArray) =>
  blogArray.reduce((a, b) => (a.likes > b.likes ? a : b));

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
