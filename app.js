var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/my_website");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


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
  req.body.blog.dashedTitle = req.body.blog.title.replace(/\s+/g, '-').toLowerCase();
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

// edit blog
app.get("/blogs/:id/edit", function(req, res) {
  res.render("edit");
})

app.listen("3000", function() {
  console.log("server started");
});
