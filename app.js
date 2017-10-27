// const express = require('express');
// const methodOverride = require('method-override');
// const expressSanitizer = require('express-sanitizer');
// const app = express();
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
//
// require('./models/Blog');
// require('./services/passport');
//
// mongoose.connect('mongodb://localhost/my_website');
//
// app.use(express.static('public'));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(expressSanitizer());
// app.set('view engine', 'ejs');
// app.use(methodOverride('_method'));
//
// app.get('/', function(req, res) {
//   res.render('index');
// });
//
// // show all blogs
// app.get('/blogs', function(req, res) {
//   Blog.find({}, function(err, blogs) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.render('blogs', { blogs: blogs });
//     }
//   });
// });
//
// // create a new blog
// app.post('/blogs', function(req, res) {
//   req.body.blog.dashedTitle = req.body.blog.title
//     .replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '')
//     .replace(/\s+/g, '-')
//     .toLowerCase();
//   req.body.blog.body = req.sanitize(req.body.blog.body);
//   Blog.create(req.body.blog, function(err, newlyCreatedBlog) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(newlyCreatedBlog);
//       res.redirect('/blogs');
//     }
//   });
// });
//
// app.get('/blogs/new', function(req, res) {
//   res.render('newblog.ejs');
// });
//
// // show one blog
// app.get('/blogs/:dashedTitle', function(req, res) {
//   Blog.findOne({ dashedTitle: req.params.dashedTitle }, function(
//     err,
//     foundBlog
//   ) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.render('viewblog', { blog: foundBlog });
//     }
//   });
// });
//
// app.get('/blogs/:id/edit', function(req, res) {
//   Blog.findById(req.params.id, function(err, foundBlog) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.render('edit', { blog: foundBlog });
//     }
//   });
// });
//
// // update blog
// app.put('/blogs/:id', function(req, res) {
//   req.body.blog.dashedTitle = req.body.blog.title
//     .replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '')
//     .replace(/\s+/g, '-')
//     .toLowerCase();
//   req.body.blog.body = req.sanitize(req.body.blog.body);
//   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(
//     err,
//     updatedBlog
//   ) {
//     if (err) {
//       res.redirect('/blogs');
//     } else {
//       res.redirect('/blogs/' + req.body.blog.dashedTitle);
//     }
//   });
// });
//
// // delete blog
// app.delete('/blogs/:id', function(req, res) {
//   Blog.findByIdAndRemove(req.params.id, function(err) {
//     if (err) {
//       res.redirect('/blogs');
//     } else {
//       res.redirect('/blogs');
//     }
//   });
// });
//
// app.listen('3000', function() {
//   console.log('server started');
// });

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys.js');

require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoUri);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('server start');
});
