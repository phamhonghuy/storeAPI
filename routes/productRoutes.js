// routes/productRoutes.js
const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

const authenticateToken = require('../middleware/authenticateToken');

router.get('/products', productController.listProducts);
router.post('/products', productController.createProduct);
router.get('/products/:id', productController.getProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
