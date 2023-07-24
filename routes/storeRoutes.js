// routes/storeRoutes.js
const express = require('express');
const storeController = require('../controllers/storeController');
const router = express.Router();

const authenticateToken = require('../middleware/authenticateToken');

router.get('/stores', storeController.listStores);
router.post('/stores', authenticateToken, storeController.createStore);
router.get('/stores/:id', storeController.getStore);
router.put('/stores/:id', authenticateToken, storeController.updateStore);
router.delete('/stores/:id', authenticateToken, storeController.deleteStore);

module.exports = router;
