const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  const products = await Product.getAll();
  res.json(products);
};

exports.getProduct = async (req, res) => {
  const product = await Product.getById(req.params.id);
  if (!product) return res.status(404).json({ message: "Produit non trouvé" });
  res.json(product);
};

exports.createProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;
  await Product.create(name, description, price, stock);
  res.status(201).json({ message: "Produit créé" });
};

exports.updateProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;
  await Product.update(req.params.id, name, description, price, stock);
  res.json({ message: "Produit modifié" });
};

exports.deleteProduct = async (req, res) => {
  await Product.delete(req.params.id);
  res.json({ message: "Produit supprimé" });
};