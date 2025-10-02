const { db } = require('../config/firebase');
const bcrypt = require('bcryptjs');

const COLLECTION = 'users';

async function getByEmail(email) {
  const snap = await db.collection(COLLECTION).where('email', '==', email.toLowerCase()).limit(1).get();
  if (snap.empty) return null;
  const doc = snap.docs[0];
  return { id: doc.id, ...doc.data() };
}

async function getById(id) {
  const doc = await db.collection(COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

async function createUser({ name, email, password }) {
  const exists = await getByEmail(email);
  if (exists) throw new Error('Email already registered');
  const passwordHash = await bcrypt.hash(password, 10);
  const payload = {
    name,
    email: email.toLowerCase(),
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  const ref = await db.collection(COLLECTION).add(payload);
  return { id: ref.id, name: payload.name, email: payload.email };
}

module.exports = { getByEmail, getById, createUser };

