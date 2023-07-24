// controllers/productController.js
const Product = require('../models/product');

exports.listProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('store', 'store_name');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { store_id, product_name, description, price, stock_quantity } = req.body;
    const product = new Product({
      store: store_id,
      product_name,
      description,
      price,
      stock_quantity,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate('store', 'store_name');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { store_id, product_name, description, price, stock_quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the logged-in user is the owner of the product's store
    if (product.store.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to update this product' });
    }

    // Update the product
    product.store = store_id;
    product.product_name = product_name;
    product.description = description;
    product.price = price;
    product.stock_quantity = stock_quantity;
    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the logged-in user is the owner of the product's store
    if (product.store.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to delete this product' });
    }

    // Delete the product
    await product.remove();

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};
