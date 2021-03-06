const mongoose = require('mongoose');
const vaildEmail = require('mongoose-unique-validator');

const authSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

authSchema.plugin(vaildEmail);  //unikalny email 

module.exports = mongoose.model('User', authSchema);
