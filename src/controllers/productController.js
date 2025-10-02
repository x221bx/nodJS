const { createProduct, listProducts } = require('../models/productModel');
const { getById: getCategoryById } = require('../models/categoryModel');
const productSchemas = require('../validation/productSchemas');

async function create(req, res) {
  try {
    const { error, value } = productSchemas.create.body.validate(req.body || {}, { abortEarly: false, stripUnknown: true });
    if (error) return res.status(400).json({ message: 'Validation error', details: error.details.map(d => d.message) });
    const { name, price, description, categoryId } = value;
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
