const router = require('express').Router();
const { create, list } = require('../controllers/productController');
const { requireAuth } = require('../middlewares/auth');
const { validate } = require('../middlewares/validate');
const productSchemas = require('../validation/productSchemas');

router.get('/', list);
router.post('/', requireAuth, validate(productSchemas.create), create);

module.exports = router;
