// models/product.js
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const productSchema = new mongoose.Schema({
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  product_name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock_quantity: { type: Number, required: true },
});

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
