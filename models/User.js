const db = require('../config/db');

exports.findByEmail = async (email) => {
   const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
   return rows[0];
};

exports.createUser = async (name, email, password, role) => {
   await db.query(
      "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)",
      [name,email,password,role]
   );
};