// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const secretKey = '`l4F>2w=Hnr`Dri6k<4amC@W0@2=`&HDsUrs#aq~H4L`Z)S3R(}mg#e+0RDiq>Jx';

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // In a real application, you would validate the user's data here
    // For simplicity, we are assuming the data is valid

    const userData = { username, email, password };
    const newUser = await User.createUser(userData);
    const token = jwt.sign({ username:username, email: email }, secretKey);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // In a real application, you would validate the user's credentials here
    // For simplicity, we are querying the database to find the user

    const user = await User.findOne({ 'username':username }); // Query to find the user by their username

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // User found and password matches, issue a JWT token
    Id = user._id;
    const token = jwt.sign({ username: user.username, email: user.email }, secretKey);
    res.json({ token , Id});
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};