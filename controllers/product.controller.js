const Product = require('../models/Product');
const { productSchema } = require('../validation/product.validation');
// exports.getProducts = async (req, res) => {
//   const products = await Product.getAll();
//   res.json(products);
// };

exports.getProducts = async (req, res) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const offset = (page - 1) * limit;

  const products = await Product.getProductsPaginated(limit, offset);

  res.json({
    page,
    limit,
    products
  });

};

exports.getProduct = async (req, res) => {
  const product = await Product.getById(req.params.id);
  if (!product) return res.status(404).json({ message: "Produit non trouvé" });
  res.json(product);
};

exports.createProduct = async (req, res) => {
  const { error } = productSchema.validate(req.body);
// Validation des données d'entrée
  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }
  const { name, description, price, stock } = req.body;
  // récupération de l'image uploadée
  const image = req.file ? req.file.filename : null;
  await Product.create(name, description, price, stock, image);
  res.status(201).json({ message: "Produit créé", image: image});
};

exports.updateProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;
  // récupération de l'image uploadée
  const image = req.file ? req.file.filename : null;
  await Product.update(req.params.id, name, description, price, stock, image);
  res.json({ message: "Produit modifié" });
};

exports.deleteProduct = async (req, res) => {
  await Product.delete(req.params.id);
  res.json({ message: "Produit supprimé" });
};