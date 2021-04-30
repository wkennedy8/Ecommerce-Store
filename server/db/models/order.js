const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cart'
    },
    subtotal: {
      type: Number,
      required: true
    },
    tax: {
      type: Number,
      required: true,
      default: 0.07
    },
    total: {
      type: Number,
      required: true
    },
    transactionId: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
