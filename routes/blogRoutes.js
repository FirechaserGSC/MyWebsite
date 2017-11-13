const mongoose = require('mongoose');
const Blog = mongoose.model('blogs');

module.exports = app => {
  app.post('/api/blogs', (req, res) => {
    const { title, image, body } = req.body;

    const blog = new Blog({
      title,
      image,
      body
    });

    blog.save();
  });

  app.get('/api/blogs', async (req, res) => {
    const blogs = await Blog.find();
    res.send(blogs);
  });
};
