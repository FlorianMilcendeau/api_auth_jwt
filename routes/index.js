const router = require('express').Router();
const authenticate = require('../controllers/authenticate');

/** Route authentication */
router.use('/authenticate', authenticate);

module.exports = router;
