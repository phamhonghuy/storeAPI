// controllers/productController.js
const Product = require('../models/product');
const Store = require('../models/store');

exports.listProducts = async (req, res) => {
  try {
    const { page = 1, perPage = 10, search = '' } = req.query;
    const options = {
      page: parseInt(page),
      limit: parseInt(perPage),
      collation: {
        locale: 'en', // Use 'en' for case-insensitive search
      },
    };
    let stores = await Store.find({user:"64beb9b5383efc2f0e946769"})
    let storeIds = stores.map(store => store._id) // Get the IDs of the stores
    const query = {
      'store': storeIds, // Filter products by the user ID of the currently logged-in user
    };

    if (search) {
      query.product_name = { $regex: search, $options: 'i' }; // Perform a case-insensitive search on product_name
    }

    const products = await Product.paginate(query, options);

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
    if (product.store.user.toString() !== req.body.user_id.toString()) {
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

    const product1 = await Product.findById(productId);

    if (!product1) {
      return res.status(404).json({ message: 'Product not found' });
    }
    let store = await Store.findById(product1.store._id)
    // Check if the logged-in user is the owner of the product's store
    if (store.user.toString() !== req.body.user_id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to delete this product' });
    }

    // Delete the product
    await product1.deleteOne({_id:productId});
console.log(1);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};
