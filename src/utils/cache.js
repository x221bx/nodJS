// Tiny in-memory TTL cache
const store = new Map();

function now() {
  return Date.now();
}

function get(key) {
  const entry = store.get(key);
  if (!entry) return null;
  if (entry.expireAt && entry.expireAt < now()) {
    store.delete(key);
    return null;
  }
  return entry.value;
}

function set(key, value, ttlMs) {
  const expireAt = ttlMs ? now() + ttlMs : 0;
  store.set(key, { value, expireAt });
}

function del(key) {
  store.delete(key);
}

module.exports = { get, set, del };

