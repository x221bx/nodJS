const admin = require('firebase-admin');
const path = require('path');

// Use local service account file only (no .env)
if (!admin.apps.length) {
  const serviceAccountPath = path.resolve(__dirname, '../../config/serviceAccountKey.json');
  admin.initializeApp({
    credential: admin.credential.cert(require(serviceAccountPath)),
  });
}

const db = admin.firestore();

module.exports = { admin, db };
