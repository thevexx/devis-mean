const mongoose = require('mongoose');

const employee = new mongoose.Schema({
  tel: String,
  address: String,
  skills: { type: String, required: true },
  status: String,
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'project' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  isArchived: { type: String, required: true, default: false },

});

module.exports = mongoose.model('employee', employee);
