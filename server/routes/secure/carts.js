const router = require('express').Router();
const {
  createOrUpdateCart,
  decrementCart,
  getCart,
  removeItemFromCart
} = require('../../controllers/carts');

//create/update a cart
router.post('/', createOrUpdateCart);

//remove items from cart
router.put('/:id', decrementCart);

//cart for currentUser
router.get('/', getCart);

router.post('/:id/remove', removeItemFromCart);

module.exports = router;
