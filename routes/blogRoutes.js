const mongoose = require('mongoose');
const Blog = mongoose.model('blogs');

module.exports = app => {
  app.get('/api/blogs', async (req, res) => {
    const blogs = await Blog.find();
    res.send(blogs);
    // const blogs = [{ title: 'test1' }, { title: 'test2' }];
    // console.log(blogs);
    // res.send(blogs);
  });
};
