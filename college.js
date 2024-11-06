const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes leading/trailing spaces
    minlength: 1, // Ensures non-empty string
  },
  ocB: {
    type: Number,
    default: null, // Optional, defaults to null if not provided
  },
  ocG: {
    type: Number,
    default: null,
  },
  bcaB: {
    type: Number,
    default: null,
  },
  bcaG: {
    type: Number,
    default: null,
  },
  bcbB: {
    type: Number,
    default: null,
  },
  bcbG: {
    type: Number,
    default: null,
  },
  bccB: {
    type: Number,
    default: null,
  },
  bccG: {
    type: Number,
    default: null,
  },
  bcdB: {
    type: Number,
    default: null,
  },
  bcdG: {
    type: Number,
    default: null,
  },
  bceB: {
    type: Number,
    default: null,
  },
  bceG: {
    type: Number,
    default: null,
  },
  scB: {
    type: Number,
    default: null,
  },
  scG: {
    type: Number,
    default: null,
  },
  stB: {
    type: Number,
    default: null,
  },
  stG: {
    type: Number,
    default: null,
  },
  egoB: {
    type: Number,
    default: null,
  },
  egoG: {
    type: Number,
    default: null,
  },
  branch: {
    type: String,
    trim: true,
    required: true, // Ensures a branch is always provided
    minlength: 1,
  },
});

const College = mongoose.model('College', collegeSchema);

module.exports = College;
