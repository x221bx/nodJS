const router = require('express').Router();
const { create, list } = require('../controllers/productController');
const { requireAuth } = require('../middlewares/auth');

router.get('/', list);
router.post('/', requireAuth, create);

module.exports = router;
