const router = require('express').Router();
const { createProduct } = require('../../controllers/products');

router.post('/create', createProduct);

module.exports = router;
