var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blogs");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var blogSchema = new mongoose.Schema({
    title: String,
    abstract: String,
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create(
//   {
//     title: "test1",
//     abstract: "test1 abstract"
//   }, function(err, blog) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("blog created");
//       console.log(blog);
//     }
//   });

Blog.create(
  {
    title: "test2",
    abstract: "test2 abstract"
  }, function(err, blog) {
    if (err) {
      console.log(err);
    } else {
      console.log("blog created");
      console.log(blog);
    }
  });

// var blogs = [
//     {
//       title: "test1",
//       abstract: "test1 abstract"
//     },
//     {
//       title: "test2",
//       abstract: "test2 abstract"
//     }
// ];

app.get("/", function(req, res) {
    res.render("index");
});

app.get("/blogs", function(req, res) {
    // get blogs from db
    Blog.find({}, function(err, blogs) {
      if (err) {
        console.log(err);
      } else {
        res.render("blogs", {blogs, blogs});
      }
    });
});

app.get("/blogs/new", function(req, res) {
	res.render("newblog.ejs");
});

app.listen("3000", function() {
  console.log("server started");
});
