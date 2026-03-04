const db = require('../config/db');

exports.createOrder = async (user_id, total) => {
  await db.query(
    "INSERT INTO orders (user_id, total) VALUES (?, ?)",
    [user_id, total]
  );
};

exports.getAllOrders = async () => {
  const [rows] = await db.query(`
    SELECT orders.*, users.name 
    FROM orders
    JOIN users ON orders.user_id = users.id
  `);
  return rows;
};

exports.getOrdersByUser = async (user_id) => {
  const [rows] = await db.query(
    "SELECT * FROM orders WHERE user_id = ?",
    [user_id]
  );
  return rows;
};