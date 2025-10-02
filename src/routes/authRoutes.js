const router = require('express').Router();
const { signup, signin } = require('../controllers/authController');
const { validate } = require('../middlewares/validate');
const authSchemas = require('../validation/authSchemas');

router.post('/signup', validate(authSchemas.signup), signup);
router.post('/signin', validate(authSchemas.signin), signin);

module.exports = router;
