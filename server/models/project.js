const mongoose = require('mongoose');

const project = new mongoose.Schema({
  type: { type: String, required: true },
  dateLimit: String,
  dateCreation: { type: Date, default: Date.now },
  description: String,
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'client' },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'service' }],
  quantities: [{ type: mongoose.Schema.Types.Number }],
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'employee' }],
  isArchived: { type: String, required: true, default: false },
  status: { type: String, required: true, default: 'in progress', enum: ['finished', 'in progress'] },

});

module.exports = mongoose.model('project', project);
