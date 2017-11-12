const mongoose = require('mongoose');
const Blog = mongoose.model('blogs');

module.exports = app => {
  app.post('/api/blogs', (req, res) => {});

  app.get('/api/blogs', async (req, res) => {
    const blogs = await Blog.find();
    res.send(blogs);
  });
};
