var express = require("express");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/my_website");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(methodOverride("_method"));


// SCHEMA SETUP
var blogSchema = new mongoose.Schema({
    title: String,
    dashedTitle: String,
    image: String,
    createdTime: {type: Date, default: Date.now},
    abstract: String,
    body: String
});

var Blog = mongoose.model("Blog", blogSchema);

app.get("/", function(req, res) {
  res.render("index");
});

// show all blogs
app.get("/blogs", function(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) {
      console.log(err);
    } else {
      res.render("blogs", {blogs: blogs});
    }
  });
});

// create a new blog
app.post("/blogs", function(req, res) {
  req.body.blog.dashedTitle = req.body.blog.title.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '').replace(/\s+/g, '-').toLowerCase();
  req.body.blog.body=req.sanitize(req.body.blog.body);
  Blog.create(req.body.blog, function(err, newlyCreatedBlog) {
    if (err) {
      console.log(err);
    } else {
      console.log(newlyCreatedBlog);
      res.redirect("/blogs");
    }
  });
});

app.get("/blogs/new", function(req, res) {
	res.render("newblog.ejs");
});

// show one blog
app.get("/blogs/:dashedTitle", function(req, res) {
  Blog.findOne({dashedTitle: req.params.dashedTitle}, function(err, foundBlog) {
    if (err) {
      console.log(err);
    } else {
      res.render("viewblog", {blog: foundBlog});
    }
  });
});

app.get("/blogs/:id/edit", function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      console.log(err);
    } else {
      res.render("edit", {blog: foundBlog});
    }
  });
});

// update blog
app.put("/blogs/:id", function(req, res) {
  req.body.blog.dashedTitle = req.body.blog.title.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '').replace(/\s+/g, '-').toLowerCase();
  req.body.blog.body=req.sanitize(req.body.blog.body);
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs/" + req.body.blog.dashedTitle);
    }
  });
});

// delete blog
app.delete("/blogs/:id", function(req, res) {
  Blog.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs");
    }
  })
});

app.listen("3000", function() {
  console.log("server started");
});
