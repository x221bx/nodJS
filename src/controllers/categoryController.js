const { createCategory, listCategories } = require('../models/categoryModel');

async function create(req, res) {
  try {
    const { name } = req.body || {};
    if (!name) return res.status(400).json({ message: 'name is required' });
    const category = await createCategory({ name });
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
