const mongoose = require('mongoose');

const product = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: String, required: true },
  isArchived: { type: String, required: true, default: false },

});

module.exports = mongoose.model('product', product);
