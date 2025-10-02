const { db } = require('../config/firebase');
const cache = require('../utils/cache');
const { CACHE_TTL_MS } = require('../config/constants');

const COLLECTION = 'products';

async function createProduct({ name, price, description, categoryId, userId }) {
  const payload = {
    name,
    price: Number(price),
    description: description || '',
    categoryId: categoryId || null,
    createdBy: userId,
    createdAt: new Date().toISOString(),
  };
  const ref = await db.collection(COLLECTION).add(payload);
  // invalidate cached list
  cache.del('products:list');
  return { id: ref.id, ...payload };
}

async function listProducts() {
  const cached = cache.get('products:list');
  if (cached) return cached;
  const snap = await db.collection(COLLECTION).orderBy('createdAt', 'desc').get();
  const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  cache.set('products:list', items, CACHE_TTL_MS);
  return items;
}

module.exports = { createProduct, listProducts };
