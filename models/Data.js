// models/Data.js
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  name: String,
  location: String,
}, { collection: 'cabin' });

module.exports = mongoose.model('Data', dataSchema);
