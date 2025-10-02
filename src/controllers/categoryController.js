const { createCategory, listCategories } = require('../models/categoryModel');
const categorySchemas = require('../validation/categorySchemas');

async function create(req, res) {
  try {
    const { error, value } = categorySchemas.create.body.validate(req.body || {}, { abortEarly: false, stripUnknown: true });
    if (error) return res.status(400).json({ message: 'Validation error', details: error.details.map(d => d.message) });
    const category = await createCategory({ name: value.name });
    return res.status(201).json({ category });
  } catch (err) {
    return res.status(400).json({ message: err.message || 'Create failed' });
  }
}

async function list(_req, res) {
  const categories = await listCategories();
  res.set('Cache-Control', 'public, max-age=30');
  return res.json({ categories });
}

module.exports = { create, list };
