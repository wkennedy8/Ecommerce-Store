const stripe = require('stripe')(process.env.STRIPE_KEY);
const Cart = require('../db/models/cart');
const Order = require('../db/models/order');

exports.paymentIntent = async (req, res) => {
  const { shoppingCart, paymentMethod } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount:
      (Number(shoppingCart.total) * 0.07 + Number(shoppingCart.total)) * 100,
    currency: 'usd',
    description: shoppingCart._id,
    metadata: { integration_check: 'accept_a_payment' },
    receipt_email: paymentMethod.billing_details.email
  });

  return res.json(paymentIntent['client_secret']);
};

exports.newOrder = async (req, res) => {
  const { shoppingCart, transactionId } = req.body;
  const newOrder = new Order({
    cart: shoppingCart._id,
    subtotal: shoppingCart.total.toFixed(2),
    total: Number(shoppingCart.total) * 0.07 + Number(shoppingCart.total),
    transactionId
  });
  await newOrder.save();

  const cart = await Cart.findById(shoppingCart._id);
  cart.isOpen = false;
  await cart.save();

  req.user.orders.push(newOrder._id);
  await req.user.save();

  res.json(newOrder);
};
