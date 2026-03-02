const Product = require('../models/Product');

exports.getProducts = async (req,res)=>{
   const products = await Product.getAll();
   res.json(products);
};

exports.createProduct = async (req,res)=>{
   const {name,description,price,stock} = req.body;
   await Product.createProduct(name,description,price,stock);
   res.json({message:"Product created"});
};

exports.deleteProduct = async (req,res)=>{
   const {id} = req.params;
   await Product.deleteProduct(id);
   res.json({message:"Product deleted"});
};

exports.updateProduct = async (req,res)=>{
   const {id} = req.params;
   const {name,description,price,stock} = req.body;
   await Product.updateProduct(id,name,description,price,stock);
   res.json({message:"Product updated"});
};

exports.getProductById = async (req,res)=>{
   const {id} = req.params;
   const product = await Product.findById(id);
   if(!product) return res.status(404).json({message:"Product not found"});
   res.json(product);
};

