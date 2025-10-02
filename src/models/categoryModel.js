const { db } = require('../config/firebase');
const cache = require('../utils/cache');
const { CACHE_TTL_MS } = require('../config/constants');

const COLLECTION = 'categories';

async function createCategory({ name }) {
  const exists = await db.collection(COLLECTION).where('name', '==', name).limit(1).get();
  if (!exists.empty) throw new Error('Category already exists');
  const payload = { name, createdAt: new Date().toISOString() };
  const ref = await db.collection(COLLECTION).add(payload);
  // invalidate cached list
  cache.del('categories:list');
  return { id: ref.id, ...payload };
}

async function getById(id) {
  const doc = await db.collection(COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

async function listCategories() {
  const cached = cache.get('categories:list');
  if (cached) return cached;
  const snap = await db.collection(COLLECTION).orderBy('name').get();
  const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  cache.set('categories:list', items, CACHE_TTL_MS);
  return items;
}

module.exports = { createCategory, getById, listCategories };
