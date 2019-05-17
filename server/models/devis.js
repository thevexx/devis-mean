const mongoose = require('mongoose');

const devis = new mongoose.Schema({
  type: { type: String, required: true },
  dateCreation: { type: Date, default: Date.now },
  dateLimit: Date,
  description: String,
  isAffected: { type: Boolean, default: null },
  isConfirmed: { type: Boolean, default: null },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'client', required: true },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'service' }],
  quantities: [{ type: mongoose.Schema.Types.Number }],
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
  isArchived: { type: String, required: true, default: false },

});



module.exports = mongoose.model('devis', devis);
