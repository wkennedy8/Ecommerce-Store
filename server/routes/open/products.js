const router = require('express').Router();
const { getProducts, getProduct } = require('../../controllers/products');

router.get('/', getProducts);
router.get('/:id', getProduct);

module.exports = router;
