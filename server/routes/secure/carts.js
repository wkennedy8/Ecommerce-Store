const router = require('express').Router();
const {
  createOrUpdateCart,
  decrementCart,
  getCart
} = require('../../controllers/carts');

//create/update a cart
router.post('/', createOrUpdateCart);

//remove items from cart
router.put('/:id', decrementCart);

//cart for currentUser
router.get('/', getCart);

module.exports = router;
