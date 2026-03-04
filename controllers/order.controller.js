const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  const user_id = req.user.id;
  const { total } = req.body;

  await Order.createOrder(user_id, total);

  res.status(201).json({ message: "Commande créée" });
};

exports.getAllOrders = async (req, res) => {
  const orders = await Order.getAllOrders();
  res.json(orders);
};

exports.getMyOrders = async (req, res) => {
  const orders = await Order.getOrdersByUser(req.user.id);
  res.json(orders);
};