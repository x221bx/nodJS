const router = require('express').Router();

router.get('/health', (_req, res) => res.json({ ok: true }));

router.use('/auth', require('./authRoutes'));
router.use('/products', require('./productRoutes'));
router.use('/categories', require('./categoryRoutes'));

module.exports = router;

