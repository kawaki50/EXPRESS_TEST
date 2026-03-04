const db = require('../config/db');

exports.getDashboard = async (req, res) => {
  const [[users]] = await db.query("SELECT COUNT(*) as total_users FROM users");
  const [[products]] = await db.query("SELECT COUNT(*) as total_products FROM products");
  const [[orders]] = await db.query("SELECT COUNT(*) as total_orders FROM orders");
  const [[revenue]] = await db.query("SELECT SUM(total) as total_revenue FROM orders");

  res.json({
    total_users: users.total_users,
    total_products: products.total_products,
    total_orders: orders.total_orders,
    total_revenue: revenue.total_revenue || 0
  });
};