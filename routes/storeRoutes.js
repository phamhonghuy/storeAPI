// routes/storeRoutes.js
const express = require('express');
const storeController = require('../controllers/storeController');
const router = express.Router();

const authenticateToken = require('../middleware/authenticateToken');

router.get('/stores', storeController.listStores);
router.post('/stores', storeController.createStore);
router.get('/stores/:id', storeController.getStore);
router.put('/stores/:id', storeController.updateStore);
router.delete('/stores/:id', storeController.deleteStore);

module.exports = router;
