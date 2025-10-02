const dotenv = require('dotenv');
dotenv.config();

const PORT = parseInt(process.env.PORT, 10) || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'super-simple-secret';
const CACHE_TTL_MS = parseInt(process.env.CACHE_TTL_MS, 10) || 30000;

module.exports = { PORT, JWT_SECRET, CACHE_TTL_MS };
