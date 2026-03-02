const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req,res)=>{
   const {name,email,password} = req.body;

   const hashed = await bcrypt.hash(password,10);
   await User.createUser(name,email,hashed,'employee');

   res.json({message:"User created"});
};

exports.login = async (req,res)=>{
   const {email,password} = req.body;

   const user = await User.findByEmail(email);
   if(!user) return res.status(404).json({message:"User not found"});

   const valid = await bcrypt.compare(password,user.password);
   if(!valid) return res.status(400).json({message:"Wrong password"});

   const token = jwt.sign({id:user.id,role:user.role},"secret",{expiresIn:"1d"});

   res.json({token});
};