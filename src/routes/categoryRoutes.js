const router = require('express').Router();
const { create, list } = require('../controllers/categoryController');
const { requireAuth } = require('../middlewares/auth');
const { validate } = require('../middlewares/validate');
const categorySchemas = require('../validation/categorySchemas');

router.get('/', list);
router.post('/', requireAuth, validate(categorySchemas.create), create);

module.exports = router;
