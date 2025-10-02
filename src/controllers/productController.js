const { createProduct, listProducts } = require('../models/productModel');
const { getById: getCategoryById } = require('../models/categoryModel');

async function create(req, res) {
  try {
    const { name, price, description, categoryId } = req.body || {};
    if (!name || price === undefined) return res.status(400).json({ message: 'name and price are required' });
    if (categoryId) {
      const cat = await getCategoryById(categoryId);
      if (!cat) return res.status(400).json({ message: 'Invalid categoryId' });
    }
    const product = await createProduct({ name, price, description, categoryId, userId: req.user.id });
    return res.status(201).json({ product });
  } catch (err) {
    return res.status(400).json({ message: err.message || 'Create failed' });
  }
}

async function list(_req, res) {
  const products = await listProducts();
  res.set('Cache-Control', 'public, max-age=30');
  return res.json({ products });
}

module.exports = { create, list };
