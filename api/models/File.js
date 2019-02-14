const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  isbn: String,
  title: String,
  author: String, //username
  description: String,
  creationDate: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },
  revision: Number
  
});

module.exports = mongoose.model('File', FileSchema);