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

   const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
  );

  // sauvegarder refresh token
   await User.saveRefreshToken(user.id, refreshToken);

  res.json({
      accessToken,
      refreshToken
  });
};

exports.refreshToken = async (req,res)=>{

   const { refreshToken } = req.body;

   if(!refreshToken)
      return res.status(401).json({message:"Refresh token required"});

   const user = await User.findByRefreshToken(refreshToken);

   if(!user)
      return res.status(403).json({message:"Invalid refresh token"});

   jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
      (err,decoded)=>{

         if(err)
            return res.status(403).json({message:"Token expired"});

         const accessToken = jwt.sign(
            { id:user.id, role:user.role },
            process.env.JWT_SECRET,
            { expiresIn:'15m' }
         );

         res.json({accessToken});

      }
   );

};

exports.logout = async (req,res)=>{

   const { refreshToken } = req.body;

   await User.removeRefreshToken(refreshToken);

   res.json({message:"Logged out"});

};