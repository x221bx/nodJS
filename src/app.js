const express = require('express');
const cors = require('cors');
const compression = require('compression');

const app = express();

app.disable('x-powered-by');
app.set('etag', 'strong');
app.use(cors());
app.use(compression());
app.use(express.json({ limit: '100kb' }));

app.use('/api', require('./routes'));

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

module.exports = app;
