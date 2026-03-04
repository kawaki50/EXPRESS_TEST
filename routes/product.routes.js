const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);

router.post('/', auth, role('admin'), productController.createProduct);
router.put('/:id', auth, role('admin'), productController.updateProduct);
router.delete('/:id', auth, role('admin'), productController.deleteProduct);

module.exports = router;