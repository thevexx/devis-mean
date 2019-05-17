const mongoose = require('mongoose');

const client = new mongoose.Schema({
  name: String,
  lastname: String,
  email: { type: String, unique: true, required: true },
  tel: String,
  company: { type: String, required: true },
  address: String,
  devis: [{ type: mongoose.Schema.Types.ObjectId, ref: 'devis' }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'project' }],
  isArchived: { type: String, required: true, default: false },

});

module.exports = mongoose.model('client', client);
