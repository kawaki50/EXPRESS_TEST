const db = require('../config/db');

exports.getAll = async () => {
  const [rows] = await db.query("SELECT * FROM products");
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
  return rows[0];
};

exports.create = async (name, description, price, stock) => {
  await db.query(
    "INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)",
    [name, description, price, stock]
  );
};

exports.update = async (id, name, description, price, stock) => {
  await db.query(
    "UPDATE products SET name=?, description=?, price=?, stock=? WHERE id=?",
    [name, description, price, stock, id]
  );
};

exports.delete = async (id) => {
  await db.query("DELETE FROM products WHERE id=?", [id]);
};

exports.getProductsPaginated = async (limit, offset) => {
  const [rows] = await db.query(
    "SELECT * FROM products LIMIT ? OFFSET ?",
    [limit, offset]
  );
  return rows;
};