const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { authMiddleware } = require('../middleware/auth');

// CREATE ORDER
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { shippingAddress, deliveryType, paymentMethod, deliveryDate } = req.body;

    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const items = cart.items.map(item => ({
      product: item.product._id,
      name: item.product.name,
      price: item.price,
      quantity: item.quantity,
      subtotal: item.price * item.quantity
    }));

    const subtotal = cart.totalPrice;
    const shippingFee = deliveryType === 'delivery' ? 500 : 0;
    const tax = Math.round(subtotal * 0.05);
    const totalAmount = subtotal + shippingFee + tax;

    const order = new Order({
      user: req.user.id,
      items,
      shippingAddress,
      subtotal,
      shippingFee,
      tax,
      totalAmount,
      paymentMethod,
      deliveryType,
      deliveryDate,
      paymentStatus: paymentMethod === 'cash_on_delivery' ? 'pending' : 'pending'
    });

    await order.save();

    // Clear cart
    await Cart.findByIdAndUpdate(cart._id, { items: [], totalItems: 0, totalPrice: 0 });

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
});

// GET USER ORDERS
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.product').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// GET ORDER DETAILS
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order' });
  }
});

module.exports = router;
