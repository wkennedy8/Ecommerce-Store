const router = require('express').Router();
const Cart = require('../../db/models/cart');

//create/update a cart
router.post('/', async (req, res) => {
  try {
    const { product } = req.body;
    const { remove } = req.body;
    //check if cart exists
    const existingCart = await Cart.findOne({
      userId: req.user._id,
      open: true
    });
    //if cart exists add product to cart
    if (existingCart && !remove) {
      //check if product is already in cart
      if (existingCart.products.includes(product._id)) {
        existingCart.count = existingCart.count + 1;
        existingCart.total = existingCart.count * existingCart.total;
        await existingCart.save();
        await existingCart.populate('products').execPopulate();
        return res.status(200).json(existingCart);
      }
      existingCart.products.push(product._id);
      existingCart.count = existingCart.count + 1;
      existingCart.total = existingCart.count * existingCart.total;
      await existingCart.save();
      await existingCart.populate('products').execPopulate();
      return res.status(200).json(existingCart);
    }
    //if cart exists delete product
    if (existingCart && remove) {
      existingCart.products = existingCart.product.filter(
        (item) => item !== product._id
      );
      existingCart.count = existingCart.count - 1;
      existingCart.total = existingCart.count * existingCart.total;
      await existingCart.save();
      await existingCart.populate('products').execPopulate();
      return res.status(200).json(existingCart);
    }
    //if NO existing cart
    const total = product.price;
    const count = 1;
    const cart = new Cart({
      ...req.body,
      total,
      count
    });
    cart.products.push(product._id);
    await cart.save();
    await cart.populate('products').execPopulate();
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

//cart for currentUser
router.get('/', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    await cart.populate('products').execPopulate();
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
