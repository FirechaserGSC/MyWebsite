var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("index");
});



app.get("/blogs/new", function(req, res) {
	res.render("newblog.ejs");
});

app.listen("3000", function() {
  console.log("server started");
});
