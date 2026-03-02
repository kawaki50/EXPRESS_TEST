const db = require('../config/db');

exports.getAll = async ()=>{
   const [rows] = await db.query("SELECT * FROM products");
   return rows;
};

exports.createProduct = async (name,description,price,stock) => {
   await db.query(
      "INSERT INTO products (name,description,price,stock) VALUES (?,?,?,?)",
      [name,description,price,stock]
   );
};

exports.deleteProduct = async (id) => {
   await db.query(
      "DELETE FROM products WHERE id = ?",
      [id]
   );
};

exports.updateProduct = async (id,name,description,price,stock) => {
   await db.query(
      "UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?",
      [name,description,price,stock,id]
   );
};

exports.findById = async (id) => {
   const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
   return rows[0];
};

