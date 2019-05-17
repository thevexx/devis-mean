const mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs')

const user = new mongoose.Schema({
  name: String,
  lastname: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isArchived: { type: String, required: true, default: false },
  role: { type: String, required: true, enum:['employee','admin'] },
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'employee' },

});

user.methods.comparePassword = function (candidatePassword, cb) {
  return bcrypt.compareSync(candidatePassword, this.password)
}

user.pre('save', function () {
  this.password = bcrypt.hashSync(this.password);
});

module.exports = mongoose.model('user', user);
