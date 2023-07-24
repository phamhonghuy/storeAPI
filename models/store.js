// models/store.js
const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  store_name: { type: String, required: true },
  location: { type: String },
  phone_number: { type: String },
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
