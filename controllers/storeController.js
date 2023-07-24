// controllers/storeController.js
const Store = require('../models/store');

exports.listStores = async (req, res) => {
  try {
    const stores = await Store.find().populate('user', 'username email');
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};

exports.createStore = async (req, res) => {
  try {
    const { store_name, location, phone_number, user_id } = req.body;
    // Get the user ID from the JWT token
    const store = new Store({
      user: user_id,
      store_name,
      location,
      phone_number,
    });

    await store.save();
    res.status(201).json(store);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};

exports.getStore = async (req, res) => {
  try {
    const storeId = req.params.id;
    const store = await Store.findById(storeId).populate('user', 'username email');
    if (!store) return res.status(404).json({ message: 'Store not found' });
    res.json(store);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};


exports.updateStore = async (req, res) => {
  try {
    const storeId = req.params.id;
    const { store_name, location, phone_number } = req.body;

    const store = await Store.findById(storeId);

    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    // Check if the logged-in user is the owner of the store
    if (store.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to update this store' });
    }

    // Update the store
    store.store_name = store_name;
    store.location = location;
    store.phone_number = phone_number;
    await store.save();

    res.json(store);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};

exports.deleteStore = async (req, res) => {
  try {
    const storeId = req.params.id;

    const store = await Store.findById(storeId);

    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    // Check if the logged-in user is the owner of the store
    if (store.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to delete this store' });
    }

    // Delete the associated products first
    await Product.deleteMany({ store: storeId });
    
    // Delete the store
    await store.remove();

    res.json({ message: 'Store deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};
