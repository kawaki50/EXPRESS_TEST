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

exports.saveRefreshToken = async (id, token)=>{

   await db.query(
      "UPDATE users SET refresh_token=? WHERE id=?",
      [token,id]
   );

};

exports.findByRefreshToken = async (token)=>{

   const [rows] = await db.query(
      "SELECT * FROM users WHERE refresh_token=?",
      [token]
   );

   return rows[0];

};

exports.removeRefreshToken = async (token)=>{

   await db.query(
      "UPDATE users SET refresh_token=NULL WHERE refresh_token=?",
      [token]
   );

};