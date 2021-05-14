const router = require('express').Router();
const authenticate = require('../controllers/authenticate');
const user = require('../controllers/user');

/** Route authentication */
router.use('/authenticate', authenticate);
router.use('/user', user);

module.exports = router;
