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

app.get("/blogs", function(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) {
      console.log(err);
    } else {
      res.render("blogs", {blogs: blogs});
    }
  });
});

app.post("/blogs", function(req, res) {
  // var title = req.body.title;
  // var image = req.body.image;
  // var dashedTitle = title.replace(/\s+/g, '-').toLowerCase();
  // var newBlog = {title: title, dashedTitle: dashedTitle, image: image};

  Blog.create(req.body.blog, function(err, newlyCreatedBlog) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/blogs");
    }
  });
});

app.get("/blogs/new", function(req, res) {
	res.render("newblog.ejs");
});

app.get("/blogs/:id", function(req, res) {
  //res.send("SHOW BLOG");
  Blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      console.log(err);
    } else {
      res.render("view-blog", {blog: foundBlog});
    }
  });

});

app.listen("3000", function() {
  console.log("server started");
});
