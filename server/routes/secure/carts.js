const router = require('express').Router();
const Cart = require('../../db/models/cart');

//create/update a cart
router.post('/', async (req, res) => {
  const { product, quantity } = req.body;

  //check if cart exists
  const existingCart = await Cart.findOne({ userId: req.user._id });
  if (existingCart) {
    //check if item is inside the products array
    let itemIndex = existingCart.products.findIndex(
      (p) => p.productId == product._id
    );
    if (itemIndex > -1) {
      //select the product in the products array via the index position
      let productItem = existingCart.products[itemIndex];
      //update the price
      productItem.price = Number(productItem.price) + Number(product.price);
      //update the quantity
      productItem.quantity = Number(productItem.quantity) + Number(quantity);
      //update the product item in the products array
      existingCart.products[itemIndex] = productItem;
      //update the cartQuantity
      existingCart.cartQuantity =
        Number(existingCart.cartQuantity) + Number(quantity);
    } else {
      //product does not exists in cart, add new item
      existingCart.products.push({
        productId: product._id,
        quantity,
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image
      });
      //update the cartQuantity
      existingCart.cartQuantity =
        Number(existingCart.cartQuantity) + Number(quantity);
    }
    //update the total for the cart
    //get array of just product prices
    const productPriceArray = existingCart.products.map(
      (product) => product.price
    );
    //calculate the sum
    existingCart.total = productPriceArray.reduce((accumulator, currValue) => {
      return accumulator + currValue;
    }, 0);
    await existingCart.save();
    return res.status(201).send(existingCart);
  }

  //If NO existing cart
  const { name, description, image, price, _id } = product;
  const newCart = new Cart({
    userId: req.user._id,
    products: { productId: _id, name, description, image, price, quantity },
    cartQuantity: quantity,
    total: price
  });
  await newCart.save();
  return res.status(200).json(newCart);
});

router.put('/:id', async (req, res) => {
  const { product } = req.body;

  const cart = await Cart.findOne({ userId: req.user._id, _id: req.params.id });
  if (cart) {
    //find the product
    let itemIndex = cart.products.findIndex((p) => p.productId == product._id);
    if (itemIndex > -1) {
      let productItem = cart.products[itemIndex];

      if (productItem.quantity === 1) {
        const updatedCartProductsArray = cart.products.filter(
          (product) => product.productId !== productItem.productId
        );
        cart.products = updatedCartProductsArray;
        //update the cartQuantity
        //get array of quantities for each product
        const quantitiesArray = cart.products.map(
          (product) => product.quantity
        );
        cart.cartQuantity = quantitiesArray.reduce(
          (acc, currValue) => acc + currValue,
          0
        );
        //update the total
        const productPrices = cart.products.map((product) => product.price);
        cart.total = productPrices.reduce(
          (acc, currValue) => acc + currValue,
          0
        );
        await cart.save();
        return res.status(200).json(cart);
      }

      productItem.quantity = productItem.quantity - 1;
      productItem.price = productItem.price - product.price;
      cart.products[productItem] = productItem;
      //update the cartQuantity
      //get array of quantities for each product
      const quantitiesArray = cart.products.map((product) => product.quantity);
      cart.cartQuantity = quantitiesArray.reduce(
        (acc, currValue) => acc + currValue,
        0
      );
      //update the total
      const productPrices = cart.products.map((product) => product.price);
      cart.total = productPrices.reduce((acc, currValue) => acc + currValue, 0);
      await cart.save();
      return res.status(200).json(cart);
    }
  }
});

//cart for currentUser
router.get('/', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
