// routes/productRoutes.js
const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

const authenticateToken = require('../middleware/authenticateToken');

router.get('/products', productController.listProducts);
router.post('/products', authenticateToken, productController.createProduct);
router.get('/products/:id', productController.getProduct);
router.put('/products/:id', authenticateToken, productController.updateProduct);
router.delete('/products/:id', authenticateToken, productController.deleteProduct);

module.exports = router;
