const router = require('express').Router();
const authenticate = require('../controllers/authenticate');

/** Route authentication */
router.use('/auth', authenticate);

module.exports = router;
