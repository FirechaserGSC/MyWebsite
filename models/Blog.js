const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: String,
  dashedTitle: String,
  image: String,
  createdTime: { type: Date, default: Date.now },
  abstract: String,
  body: String
});

mongoose.model('blogs', blogSchema);
